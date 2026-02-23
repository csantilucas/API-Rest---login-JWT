import { Schema, model, Document } from 'mongoose';


interface Inscription extends Document {
  eventID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  subscribedAt: Date;
}

export const InscriptionSchema = new Schema<Inscription>({
  eventID: Schema.Types.ObjectId,
  userID: Schema.Types.ObjectId,
  subscribedAt: { type: Date, default: Date.now }
});

InscriptionSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export const Subscription = model<Inscription>('Subscription', InscriptionSchema);