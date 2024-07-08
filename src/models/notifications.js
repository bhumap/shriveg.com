import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
    required:true
  },
  
},{timestamps:true});

let Notification;

try {
  Notification = mongoose.model('notification');
} catch {
  Notification = mongoose.model('notification', notificationSchema);
}

export default Notification;
