import { Router } from "express";

import {registerStudent, resendOTP, verifyCaptcha, verifyStudentRegistration} from "../controller/resistration.js"

const router=Router();



router.route("/register").post(registerStudent);

router.route("/verify").post(verifyStudentRegistration);

router.route("/verify-captcha").post(verifyCaptcha);

router.route("/resend-otp").get(resendOTP);

export default router