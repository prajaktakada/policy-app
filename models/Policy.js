const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyNumber: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' }
});

module.exports = mongoose.model('Policy', PolicySchema);
