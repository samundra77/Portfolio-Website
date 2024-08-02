const express = require('express');
const router = express.Router();

// Example experience data
const experienceData = [
    {
        title: 'Wedding Photography',
        description: 'Captured beautiful moments of the wedding ceremony.',
        imageUrl: '/images/wedding.jpg',
        awards: 'Best Wedding Photographer 2023',
        skills: 'Photography, Editing'
    },
    {
        title: 'Nature Photography',
        description: 'Stunning landscapes and nature photography.',
        imageUrl: '/images/nature.jpg',
        awards: 'Nature Photographer of the Year 2022',
        skills: 'Photography, Patience'
    }
];

// Route to get experience data
router.get('/', (req, res) => {
    res.json(experienceData);
});

module.exports = router;
