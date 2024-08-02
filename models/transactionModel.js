const mongoose = require('mongoose');
require('mongoose-long')(mongoose)
const {Types: {Long}} = mongoose;

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender not found'],
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Recipient not found']
  },
  recipientType: {
    type: String,
    required: [true, 'Recipient type not found'],
    enum: ['User', 'Merchant']
  },
  senderBalance: {
    type: Long,
    required: [true, 'Sender balance not found'],
  },
  recepientBalance: {
    type: Long,
    required: [true, 'Recipient balance not found'],
  },
  amountSender: {
    type: Long,
    required: [true, 'Amount not found'],
  },
  issuedAt: {
    type: Date,
    default: Date.now(),
  }
})

transactionSchema.virtual('recipient', {
  ref: function() {
    return this.recipientType;
  },
  localField: 'recipientId',
  foreignField: '_id',
  justOne: true
});

transactionSchema.set('toObject', { virtuals: true });
transactionSchema.set('toJSON', { virtuals: true });

const Transaction  = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;