"use client";
import NavMenu from "./Menu/NavMenu";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UseSticky from "@/hooks/UseSticky";
import HeaderSearchbar from "./Menu/HeaderSearchbar";
import LoginModal from "@/modals/LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import logo_1 from "@/assets/images/logo/logo_omnis.png";

const HeaderFour = () => {
  const { sticky } = UseSticky();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header
        className={`theme-main-menu menu-overlay menu-style-six sticky-menu ${sticky ? "fixed" : ""}`}
      >
        <div className="inner-content gap-two">
          <div className="top-header position-relative">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo_1} alt="" />
                </Link>
              </div>
              <div className="right-widget ms-auto me-3 me-lg-0 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  <li>
                    <a className="search-btn-one rounded-circle tran3s d-flex align-items-center justify-content-center">
                      <i className="bi bi-search"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2">
                <div className="collapse navbar-collapse ms-xl-5">
                  <NavMenu />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-six sticky-menu ${sticky ? "fixed" : ""}`}
      >
        <div className="inner-content gap-two">
          <div className="top-header position-relative">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo_1} alt="" />
                </Link>
              </div>

              <div className="right-widget ms-auto me-3 me-lg-0 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  {isAuthenticated && (
                    <li className="d-none d-md-inline-block me-4">
                      <Link
                        href="/dashboard/add-property"
                        className="btn-ten rounded-0"
                      >
                        <span>Add Listing</span>{" "}
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </li>
                  )}
                  {!isAuthenticated && (
                    <li>
                      <Link
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        className="login-btn-two rounded-circle tran3s d-flex align-items-center justify-content-center"
                      >
                        <i className="fa-regular fa-lock"></i>
                      </Link>
                    </li>
                  )}
                  <li>
                    <a
                      onClick={() => setIsSearch(true)}
                      style={{ cursor: "pointer" }}
                      className="search-btn-one rounded-circle tran3s d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-search"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div
                  className="collapse navbar-collapse ms-xl-5"
                  id="navbarNav"
                >
                  <NavMenu />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <LoginModal />
      <HeaderSearchbar isSearch={isSearch} setIsSearch={setIsSearch} />
    </>
  );
};

export default HeaderFour;
