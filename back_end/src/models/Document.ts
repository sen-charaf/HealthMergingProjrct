import mongoose, { Schema, Document } from 'mongoose';
 
export interface IDocument extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  uploadDate: Date;
  patientId: Schema.Types.ObjectId;
}
 
const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true }
});
 
export default mongoose.model<IDocument>('Document', DocumentSchema);