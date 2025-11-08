import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    String(process.env.JWT_SECRET),
    { expiresIn: '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, university, course, year } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      university,
      course,
      year,
    });

    // Generate token
    const token = generateToken(String(user._id));

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          university: user.university,
          course: user.course,
          year: user.year,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(String(user._id));

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          university: user.university,
          course: user.course,
          year: user.year,
          preferences: user.preferences,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!._id);

    res.json({
      success: true,
      data: {
        user: {
          id: user!._id,
          name: user!.name,
          email: user!.email,
          university: user!.university,
          course: user!.course,
          year: user!.year,
          avatar: user!.avatar,
          preferences: user!.preferences,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, university, course, year, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      {
        name: name || req.user!.name,
        university: university || req.user!.university,
        course: course || req.user!.course,
        year: year || req.user!.year,
        preferences: preferences || req.user!.preferences,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating profile',
    });
  }
};
