import { Router } from "express";
import Learnings from "../models/Learnings.js"
import Grades from "../models/Grades.js";
import Feedback from "../models/feedback.js";

const router = new Router();

// GET  READ OPERATION
router.get("/", async(req,res,next)=>
{
    
try{
    const learners = await Learnings.find();
    if(learners)
    {
        res.json( { learners});
    }
    else{
        res.json({ message: "No learners found" });
    }
}
catch (error) {
    next(error)

}
});

// GET by id/ READ operation

router.get("/:id", async(req, res, next) =>
{
  
try{
        const learners = await Learnings.findBYID(req.params.id);
        if(learners)
        {
            res.json( { learners});
        }
        else{
            res.json({ message: "No Learners found" });
        }
    }
    catch (error) {
        next(error)
    }
}); 
    // POST CREATE OPERATION
    router.post("/", async(req, res,next)=> {
        try {
          console.log(req.body);
       
          const newlearners = await Learnings.create(req.body);
       
          if (newlearners) {
            res.status(201).json({ learners: newlearners });
          } else {
            res.status(400).json({ message: "Error creating new learner" });
          }
        } catch (error) {
          next(error);
        }
       });

       // POST CREATE OPERATION to add mutliple users at a time then use insertMany
    router.post("/seed", async(req, res,next)=> {
        try {
          console.log(req.body);
       
          const newlearners = await Learnings.insertMany(req.body.data);
       
          if (newlearners) {
            res.status(201).json({ learners: newlearners });
          } else {
            res.status(400).json({ message: "Error creating new learner" });
          }
        } catch (error) {
          next(error);
        }
       });

    //    * DELETE /api/projects/:id Delete Operation
    //    */
      router.delete("/:id", async (req, res, next) => {
          try {
            const deletedlearner = await Learnings.findByIdAndDelete(req.params.id);
        
            if (deletedlearner) {
              res.json({
                message: `Learner deleted: ${req.params.id}`,
                deletedlearner,
              });
            } else {
              res.json({ message: `Error deleting project: ${req.params.id}` });
            }
          } catch (error) {
            next(error);
          }
        });



router.post("/:id/grades", async (req, res, next) => {
  try {
    // find the project to add a new task
    const learnings = await learnings.findById(req.params.id);
    console.log(project);
 
    if (!learnings) {
      res.status(404).json({ message: `Project not found: ${req.params.id}` });
      return;
    }
 
    // create a new grades
    const grades = await Grades.create(req.body);
 
    //TODO: check if grades was created
    if (grades) {
      // add the task to the tasks array of the project
      project.grades.push(task);
 
      // save the project
      await project.save();
 
      res.status(201).json({ project });
    } else {
      res.status(400).json({ message: "Error creating task" });
    }
  } catch (error) {
    next(error);
  }
 });


export default router;