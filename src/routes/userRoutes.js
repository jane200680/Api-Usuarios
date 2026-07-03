import { Router } from "express";
import * as userService from "../services/userService.js";

const router = Router(); //instanciar clase Router

router.get('/', async (req, res, _next) =>{
    try{
        const users = await userService.getAll();
        res.status(200).json({data: users})
    } catch(error){
        _next(error)
    }
})
router.post('/', async (req, res, _next) =>{
    try{
        const user = await userService.create(req.body);
        res.status(201).json({data:user})
    } catch(error){
        _next(error)
    }
})

router.put("/:id", async (req, res, _next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.status(200).json({ data: user });
  } catch (error) {
    _next(error);
  }
});

router.delete("/:id", async (req, res, _next) => {
  try {
    const result = await userService.remove(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    _next(error);
  }
});

export default router;