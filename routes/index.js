import express from "express";
import { Register, Login, GetProfile, UpdateProfile, uploadImageProfile, GetBalance, TopupBalance } from "../controllers/Users.js";
import { banner,services} from "../controllers/Information.js";
import { transaksi, historyTransaksi } from "../controllers/transaction.js";
import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/profile', verifyToken, GetProfile);
router.get('/balance', verifyToken, GetBalance);
router.post('/topup', verifyToken, TopupBalance);
router.get('/transaction/history', verifyToken, historyTransaksi);
router.post('/transaction', verifyToken, transaksi);
router.post('/registration', Register);
router.post('/login', Login);
router.put('/profile/update', verifyToken,UpdateProfile)
router.put('/profile/image', verifyToken,uploadImageProfile)
router.get('/banner', verifyToken, banner);
router.get('/services', verifyToken, services);
// router.get('/token', refreshToken);
// router.delete('/logout', Logout);
 
export default router;