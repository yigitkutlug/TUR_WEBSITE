import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import dotenv from "dotenv";

import Personel from "../models/personel.js";
import Sofor from "../models/sofor.js";
import Kurumsal from "../models/kurumsal.js";
import Taseron from "../models/taseron.js";
import Iletisim from "../models/iletisim.js";

dotenv.config();

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    { resource: Personel, options: { navigation: "Başvurular" } },
    { resource: Sofor, options: { navigation: "Başvurular" } },
    { resource: Kurumsal, options: { navigation: "Başvurular" } },
    { resource: Taseron, options: { navigation: "Başvurular" } },
    { resource: Iletisim, options: { navigation: "İletişim" } },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "Yigitur Tur Admin",
     logo: "/images/yigitur_logo22.png", // giriş ekranı logosu
    favicon: "/images/yigitur_logo22.png", // sekmede görünen favicon
    softwareBrothers: false
  },
});

// ❗ Şifresiz kullanım
const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
