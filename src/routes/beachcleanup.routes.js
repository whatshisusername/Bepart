import { Router } from 'express';
import { createEvent,getEventById,getTodayEvents,getOtherEvents, getupcomingEvents,joinevent, joined } from '../controllers/beachcleanup.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer2.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file





router.route("/create-event").post(
        upload.single('thumbnail'),
         createEvent
        )

    
router.route("/get-event/:eventId").get(getEventById);

router.route("/today-events").get(getTodayEvents);

router.route("/other-events").get(getOtherEvents);

router.route("/upcoming-events").get(getupcomingEvents);


router.route("/joinevent/:eventId").patch(joinevent);

router.route("/joined/:eventId").get(joined);

export default router