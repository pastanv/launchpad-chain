import mongoose from 'mongoose';

export interface IOriginalTest {
  firstName: string;
  lastName: string;
  schemaVersion: string;
}

export interface IUpdatedTest {
  firstName: string;
  lastName: string;
  fullName: string;
  schemaVersion: string;
}

export const originalTestSchema = new mongoose.Schema<IOriginalTest>({
  firstName: String,
  lastName: String,
  schemaVersion: String,
});

export const updatedTestSchema = new mongoose.Schema<IUpdatedTest>({
  firstName: String,
  lastName: String,
  fullName: String,
  schemaVersion: String,
});
