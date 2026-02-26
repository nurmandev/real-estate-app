"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTokens, setMfaRequired } from "@/redux/features/authSlice";
import { api } from "@/utils/api";

import OpenEye from "@/assets/images/icon/icon_68.svg";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  email: string;
  password: string;
  mfaToken?: string;
}

// ─── Validation schemas ───────────────────────────────────────────────────────
const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .label("Email"),
    password: yup.string().required("Password is required").label("Password"),
  })
  .required();

const mfaSchema = yup
  .object({
    mfaToken: yup
      .string()
      .required("MFA code is required")
      .length(6, "MFA code must be 6 digits"),
  })
  .required();

// ─── Component ────────────────────────────────────────────────────────────────
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [pendingCredentials, setPendingCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(mfaStep ? mfaSchema : loginSchema),
  });

  const togglePasswordVisibility = () => setPasswordVisibility((v) => !v);

  // ── Step 1: email + password ──────────────────────────────────────────────
  const onLoginSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: result } = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (result.mfaRequired) {
        // Server says MFA is needed — switch to MFA step
        setPendingCredentials({ email: data.email, password: data.password });
        dispatch(setMfaRequired(data.email));
        setMfaStep(true);
        reset();
        toast.info("Enter your 6-digit MFA code.", { position: "top-center" });
        return;
      }

      // Successful login — save tokens
      dispatch(
        setTokens({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }),
      );
      toast.success("Logged in successfully!", { position: "top-center" });
      reset();
      router.push("/dashboard/dashboard-index");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid email or password.";
      toast.error(msg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: MFA token ────────────────────────────────────────────────────
  const onMfaSubmit = async (data: FormData) => {
    if (!pendingCredentials) return;
    setLoading(true);
    try {
      const { data: result } = await api.post("/api/auth/login", {
        ...pendingCredentials,
        mfaToken: data.mfaToken,
      });

      dispatch(
        setTokens({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }),
      );
      toast.success("Logged in successfully!", { position: "top-center" });
      reset();
      router.push("/dashboard/dashboard-index");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid MFA code.";
      toast.error(msg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = mfaStep ? onMfaSubmit : onLoginSubmit;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="row">
        {!mfaStep ? (
          <>
            {/* ── Email ── */}
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

            {/* ── Password ── */}
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

            {/* ── Remember / Forgot ── */}
            <div className="col-12">
              <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Keep me logged in</label>
                </div>
                <Link href="#">Forget Password?</Link>
              </div>
            </div>
          </>
        ) : (
          /* ── MFA Step ── */
          <div className="col-12">
            <div className="input-group-meta position-relative mb-25">
              <label>MFA Code*</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                {...register("mfaToken")}
                placeholder="6-digit code"
              />
              <p className="form_error">{errors.mfaToken?.message}</p>
              <p className="fs-14 mt-10" style={{ color: "#888" }}>
                Enter the code from your authenticator app.
              </p>
            </div>
            <button
              type="button"
              className="fs-14"
              style={{
                background: "none",
                border: "none",
                color: "#ff6725",
                cursor: "pointer",
                padding: 0,
                marginBottom: 12,
              }}
              onClick={() => {
                setMfaStep(false);
                setPendingCredentials(null);
                reset();
              }}
            >
              ← Back to login
            </button>
          </div>
        )}

        {/* ── Submit ── */}
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
            disabled={loading}
          >
            {loading ? (
              <span>
                <i className="fa-light fa-spinner fa-spin me-2" />
                {mfaStep ? "Verifying..." : "Logging in..."}
              </span>
            ) : mfaStep ? (
              "Verify MFA"
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
