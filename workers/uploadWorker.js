const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
// Import models
const User = require('../models/User');
const Agent = require('../models/Agent');
const Account = require('../models/Account');
const LOB = require('../models/LOB');
const Carrier = require('../models/Carrier');
const Policy = require('../models/Policy');

// Import parser
const { parseXlsx } = require('../utils/parseFile');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Worker DB connected"))
  .catch(err => console.error("DB Error in Worker:", err));

(async function () {
  try {
    const data = parseXlsx(workerData.filePath);

    console.log(data)
    for (const item of data) {
      // 1. Insert into User
      const user = new User({
        firstName: item.firstname,
        dob: item.dob,
        address: item.address,
        phone: item.phone,
        state: item.state,
        zip: item.zip,
        email: item.email,
        gender: item.gender,
        userType: item.userType,
      });
     
      await user.save();

      // 2. Insert into Agent
      const agent = new Agent({ name: item.agent });
      await agent.save();

      // 3. Insert into Account
      const account = new Account({
        accountName: item.account_name,
        userId: user._id
      });
      await account.save();

      // 4. Insert into LOB
      const lob = new LOB({ categoryName: item.category_name });
      await lob.save();

      // 5. Insert into Carrier
      const carrier = new Carrier({ companyName: item.company_name });
      await carrier.save();

      // 6. Insert into Policy
      const policy = new Policy({
        policyNumber: item.policy_number,
        startDate: item.policy_start_date,
        endDate: item.policy_end_date,
        userId: user._id,
        categoryId: lob._id,
        companyId: carrier._id
      });
      await policy.save();
    }

    parentPort.postMessage('done');
  } catch (error) {
    console.error("Error in worker thread:", error);
    parentPort.postMessage('error');
  }
})();
