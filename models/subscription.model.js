import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price must be a positive number'],
    },
    currency: {
        type: String,
        required: [true, 'Please provide a currency'],
        enum: ['usd', 'eur', 'gbp', 'nok'],
        default: 'nok',
    },
    frequency: {
        type: String,
        required: [true, 'Please provide a frequency'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['food', 'rent', 'utilities', 'transport', 'entertainment', 'other'],
        default: 'other',
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please provide a payment method'],
        enum: ['credit card', 'debit card', 'paypal', 'bank transfer'],
        default: 'credit card',
    },
    status: {
        type: String,
        required: [true, 'Please provide a status'],
        enum: ['active', 'canceled', 'trial'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date'],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Start date must be a future date',
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Please provide a renewal date'],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: moonose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
}, { timestamps: true });

// autocalculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
       const renewalPeriods = {
              daily: 1,
              weekly: 7,
              monthly: 1,
              yearly: 12,
       }

       this.renewalDate = new Date(this.startDate);
       this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // auotoupdate the rewnewal date if it has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});
