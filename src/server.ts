import { config } from "dotenv";
config();

// tslint:disable-next-line:ordered-imports
import "reflect-metadata";
import { serve } from "./bootstrap/app";

serve();
