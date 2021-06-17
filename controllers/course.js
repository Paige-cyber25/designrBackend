const courseSchema = require('../models/course');

const courseModel = async (req, res)=>{
    // console.log(req.userId, 'courses')
    try {
        const courses = await courseSchema.find()
        console.log(courses, 'courses')
        if (courses){
          return  res.json({courses})
        } else{
            return res.status(400).json({msg: 'Wahala be like bicycle 🤣'})
        }
    } catch (error) {
         return res.status(400).json({ msg: 'Wahala be like bicycle 🤣', error })
    }
}

module.exports = {courseModel};