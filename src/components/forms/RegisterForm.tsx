"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTokens } from "@/redux/features/authSlice";

import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup
        .string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character",
        ),
      termsAccepted: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        toast.success(response.data.message || "Registration successful!", {
          position: "top-center",
        });

        // Auto-login
        if (response.data.accessToken && response.data.refreshToken) {
          dispatch(
            setTokens({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }),
          );
        }

        // Programmatically close the modal using Bootstrap's data-bs-dismiss
        if (typeof window !== "undefined") {
          const closeBtn = document.getElementById("login-modal-close-btn");
          if (closeBtn) {
            closeBtn.click();
          } else {
            // Fallback if button not found
            document.body.classList.remove("modal-open");
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
          }
        }

        reset();
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Error during registration";
      toast.error(errorMessage, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input type="text" {...register("name")} placeholder="Your Name" />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Youremail@gmail.com"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Password"
              className="pass_log_id"
            />
            <span className="placeholder_icon">
              <span
                className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}
              >
                <Image
                  onClick={togglePasswordVisibility}
                  src={OpenEye}
                  alt=""
                />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                id="termsAccepted"
                {...register("termsAccepted")}
              />
              <label htmlFor="termsAccepted">
                By hitting the &quot;Register&quot; button, you agree to the{" "}
                <Link href="#">Terms conditions</Link> &{" "}
                <Link href="#">Privacy Policy</Link>
              </label>
              <p className="form_error">{errors.termsAccepted?.message}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
            disabled={loading}
          >
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
