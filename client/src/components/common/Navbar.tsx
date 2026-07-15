import { socket } from "../../socket";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart, MessageCircle, Plus, User, Package, BarChart3,
  LogOut, Menu, X, ChevronDown,
} from "lucide-react";
import logo from "../../assets/Logo.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/api/messages/my-chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const unread = res.data.chats.reduce((total: number, chat: any) => total + (chat.unread || 0), 0);
      setUnreadCount(unread);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    if (!user) return;
    fetchUnread();
    const interval = setInterval(fetchUnread, 2500);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    socket.on("receive_message", fetchUnread);
    return () => { socket.off("receive_message", fetchUnread); };
  }, []);

  // Close all transient UI (dropdown, mobile drawer) on route change
  useEffect(() => {
    setProfileMenu(false);
    setMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/login"); };

  const activeLink = (path: string) => location.pathname === path;

  const closeMenus = () => { setMobileMenu(false); setProfileMenu(false); };

  const pfpFor = (userId: string) => localStorage.getItem(`campuscart-pfp-${userId}`);

  // Shared visual treatment for the icon-only utility buttons (messages, wishlist, mobile toggle)
  const iconBtnBase =
    "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#37475A]/70 text-gray-200 shadow-sm ring-1 ring-white/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F3A847] hover:text-[#1A2430] hover:shadow-[0_8px_20px_rgba(243,168,71,0.28)] active:translate-y-0";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#2C3643]/95 shadow-[0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-[76px] max-w-[1500px] items-center justify-between gap-6 px-6 sm:px-8">

        {/* ================= LOGO — fixed left ================= */}
        <Link to="/home" className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90">
          <img src={logo} alt="CampusCart" className="h-10 w-10 rounded-xl object-contain shadow-sm ring-1 ring-white/10" />
          <span
            className="hidden text-[32px] font-bold leading-none tracking-[-0.02em] text-white sm:block"
            style={{ fontFamily: "'Inter', 'Manrope', 'Plus Jakarta Sans', 'DM Sans', 'Outfit', ui-sans-serif, system-ui, sans-serif" }}
          >
            CampusCart
          </span>
        </Link>

        {/* ================= RIGHT SIDE — fixed positions, evenly spaced ================= */}
        <div className="flex shrink-0 items-center gap-4">

          {/* Products */}
          <Link
            to="/products"
            className={`relative hidden rounded-lg px-4 py-2 text-[14px] font-semibold tracking-tight transition-colors lg:block ${
              activeLink("/products")
                ? "text-[#F3A847]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Products
            {activeLink("/products") && (
              <span className="absolute -bottom-[27px] left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#F3A847]" />
            )}
          </Link>

          {/* Sell (seller only) */}
          {user?.role === "Seller" && (
            <Link
              to="/add-product"
              className="hidden items-center gap-1.5 rounded-xl bg-[#F3A847] px-4 py-2.5 text-[13.5px] font-bold text-[#171D25] shadow-[0_2px_10px_rgba(243,168,71,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFBD64] hover:shadow-[0_10px_24px_rgba(243,168,71,0.4)] lg:flex"
            >
              <Plus size={16} strokeWidth={2.5} />
              Sell
            </Link>
          )}

          <div className="hidden items-center gap-4 lg:flex">
            {/* Messages — buyer & seller */}
            {(user?.role === "Buyer" || user?.role === "Seller") && (
              <Link to="/messages" aria-label="Messages" className={iconBtnBase}>
                <MessageCircle size={18} strokeWidth={2.25} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-[#2C3643] bg-[#E5484D] px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Wishlist — buyer only */}
            {user?.role === "Buyer" && (
              <Link to="/wishlist" aria-label="Wishlist" className={iconBtnBase}>
                <Heart size={18} strokeWidth={2.25} />
              </Link>
            )}
          </div>

          {/* Guest / Logged out */}
          {!user && !isGuest && (
            <div className="hidden items-center gap-4 pl-1 lg:flex">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-gray-300 transition-colors hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-[#F3A847] px-4 py-2.5 text-[13.5px] font-bold text-[#171D25] shadow-[0_2px_10px_rgba(243,168,71,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFBD64] hover:shadow-[0_10px_24px_rgba(243,168,71,0.4)]"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Profile dropdown */}
          {user && (
            <div className="relative hidden pl-1 lg:block">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1 pl-1 pr-3.5 ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10"
              >
                {pfpFor(user._id) ? (
                  <img
                    src={pfpFor(user._id) as string}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#F3A847]/50"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F3A847] to-[#DE8A18] text-[13px] font-bold text-[#171D25]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="hidden text-left xl:block">
                  <p className="max-w-[110px] truncate text-[12.5px] font-bold leading-tight text-white">
                    {user.name}
                  </p>
                  <p className="text-[10.5px] font-medium leading-tight text-gray-400">{user.role}</p>
                </div>

                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${profileMenu ? "rotate-180" : ""}`} />
              </button>

              {profileMenu && (
                <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_24px_60px_rgba(15,20,28,0.22)] ring-1 ring-black/5 animate-fade">
                  <div className="bg-gradient-to-br from-[#232F3E] to-[#2E3C4D] p-5">
                    <div className="flex items-center gap-3">
                      {pfpFor(user._id) ? (
                        <img
                          src={pfpFor(user._id) as string}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#F3A847]/50"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F3A847] to-[#E0891F] text-lg font-bold text-[#111]">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h2 className="truncate font-bold text-white">{user.name}</h2>
                        <p className="truncate text-xs text-gray-300">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-[#232F3E] transition-colors hover:bg-[#FFF6E5]"
                    >
                      <User size={16} className="text-[#C88400]" />
                      My Profile
                    </Link>

                    {user.role === "Seller" && (
                      <>
                        <Link
                          to="/my-listings"
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-[#232F3E] transition-colors hover:bg-[#FFF6E5]"
                        >
                          <Package size={16} className="text-[#C88400]" />
                          My Listings
                        </Link>

                        <Link
                          to="/seller-dashboard"
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium text-[#232F3E] transition-colors hover:bg-[#FFF6E5]"
                        >
                          <BarChart3 size={16} className="text-[#C88400]" />
                          Dashboard
                        </Link>
                      </>
                    )}

                    <hr className="my-2 border-gray-100" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-semibold text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
            className={`${iconBtnBase} lg:hidden`}
          >
            {mobileMenu ? <X size={19} strokeWidth={2.25} /> : <Menu size={19} strokeWidth={2.25} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenu && (
        <div className="border-t border-white/[0.06] bg-[#2C3643] lg:hidden animate-fade">
          <div className="space-y-2.5 p-4">
            <Link
              to="/products"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
            >
              Products
            </Link>

            {user?.role === "Seller" && (
              <Link
                to="/add-product"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#F3A847] py-3 text-sm font-bold text-[#171D25] transition-colors hover:bg-[#FFBD64]"
              >
                <Plus size={16} /> Sell Product
              </Link>
            )}

            {user?.role === "Buyer" && (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/messages"
                  onClick={closeMenus}
                  className="relative flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircle size={16} /> Messages
                  {unreadCount > 0 && (
                    <span className="absolute right-3 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E5484D] text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Heart size={16} /> Wishlist
                </Link>
              </div>
            )}

            {user?.role === "Seller" && (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/messages"
                  onClick={closeMenus}
                  className="relative flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircle size={16} /> Messages
                  {unreadCount > 0 && (
                    <span className="absolute right-3 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E5484D] text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/my-listings"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Package size={16} /> My Listings
                </Link>
              </div>
            )}

            {user?.role === "Seller" && (
              <Link
                to="/seller-dashboard"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <BarChart3 size={16} /> Dashboard
              </Link>
            )}

            {user && (
              <Link
                to="/profile"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <User size={16} /> My Profile
              </Link>
            )}

            {!user && !isGuest && (
              <>
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block rounded-xl bg-white py-3 text-center text-sm font-semibold text-[#232F3E]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenus}
                  className="block rounded-xl bg-[#F3A847] py-3 text-center text-sm font-bold text-[#171D25] transition-colors hover:bg-[#FFBD64]"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => { handleLogout(); closeMenus(); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;