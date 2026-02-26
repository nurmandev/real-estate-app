import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface ISession {
  sessionId: string;
  refreshTokenHash: string;
  device: string;
  ip: string;
  userAgent: string;
  lastActive: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isMfaEnabled: boolean;
  mfaSecret?: string;
  passwordHistory: string[];
  sessions: ISession[];
  failedLoginAttempts: number;
  lockUntil?: Date;
  comparePassword(password: string): Promise<boolean>;
}

const SessionSchema = new Schema<ISession>({
  sessionId: { type: String, required: true },
  refreshTokenHash: { type: String, required: true },
  device: { type: String, required: true },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  lastActive: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isMfaEnabled: {
      type: Boolean,
      default: false,
    },
    mfaSecret: {
      type: String, // Store encrypted
    },
    passwordHistory: {
      type: [String],
      default: [],
    },
    sessions: {
      type: [SessionSchema],
      default: [],
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (this: any, next: any) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    
    this.password = hash;
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (this: any, password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
