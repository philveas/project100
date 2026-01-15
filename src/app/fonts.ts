// src/app/fonts.ts
import localFont from "next/font/local";

export const nunito = localFont({
  src: [
    {
      path: "../fonts/Nunito-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Nunito-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Nunito-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Nunito-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Nunito-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Nunito-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const roboto = localFont({
  src: [
    {
      path: "../fonts/Roboto-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});
