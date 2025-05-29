import express from 'express';
import Review from '../models/Review.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('patient')
      .populate('doctor')
      .populate('appointment');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});


router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.params.doctorId })
      .populate('patient')
      .populate('appointment')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor reviews', error });
  }
});


router.get('/patient/:patientId', async (req, res) => {
  try {
    const reviews = await Review.find({ patient: req.params.patientId })
      .populate('doctor')
      .populate('appointment')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient reviews', error });
  }
});


router.get('/:id', async (req, res): Promise<any> => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('appointment');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    
    const doctorId = req.body.doctor;
    const allReviews = await Review.find({ doctor: doctorId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;
    
    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: averageRating.toFixed(1),
      reviewsCount: allReviews.length
    });
    
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error });
  }
});


router.put('/:id', async (req, res): Promise<any> => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    const doctorId = updatedReview.doctor;
    const allReviews = await Review.find({ doctor: doctorId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;
    
    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: averageRating.toFixed(1)
    });
    
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const reviewToDelete = await Review.findById(req.params.id);
    if (!reviewToDelete) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    const doctorId = reviewToDelete.doctor;
    await Review.findByIdAndDelete(req.params.id);
    
    
    const allReviews = await Review.find({ doctor: doctorId });
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allReviews.length;
      
      await Doctor.findByIdAndUpdate(doctorId, {
        averageRating: averageRating.toFixed(1),
        reviewsCount: allReviews.length
      });
    } else {
      await Doctor.findByIdAndUpdate(doctorId, {
        averageRating: 0,
        reviewsCount: 0
      });
    }
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

export default router;