import React, { useState } from "react";
import styles from "@/styles/forgotPass.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { treasureBox } from "@/assets/TreasureBox";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';