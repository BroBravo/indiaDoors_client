import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

import ProfileInfo from "../../components/profileInfo";
import AddressForm from "../../components/addressForm";

import {
  FaUserCog,
  FaShoppingBag,
  FaFilter,
  FaSyncAlt,
  FaFileUpload,
  FaFileAlt,
  FaCrown,
  FaExternalLinkAlt,
} from "react-icons/fa";

const TABS = { ACCOUNT: "account", ORDERS: "orders" };

function money(n) {
  const x = Number(n || 0);
  return Number.isFinite(x) ? x.toFixed(2) : "0.00";
}

function safe(v) {
  return v == null ? "" : String(v);
}

function toDateTimeIN(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return safe(value);
  return d.toLocaleString("en-IN");
}

function normalizeUserType(u) {
  return u?.user_type || u?.userType || u?.type || "";
}

function isBusinessPartner(u, userDetails) {
  return (normalizeUserType(u) || normalizeUserType(userDetails)) === "Business Partner";
}

function getOrderStage(status) {
  const s = (status || "").toLowerCase();
  if (s === "cancelled") return { kind: "bad", label: "Cancelled", idx: -1 };
  if (s === "returned") return { kind: "warn", label: "Returned", idx: -1 };

  const stages = ["pending", "processing", "shipped", "delivered"];
  const idx = stages.indexOf(s);
  return { kind: "ok", label: status || "Pending", idx: idx === -1 ? 0 : idx };
}

function SectionCard({ title, subtitle, children, right }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div>
          <div className={styles.cardTitle}>{title}</div>
          {subtitle ? <div className={styles.cardSub}>{subtitle}</div> : null}
        </div>
        {right ? <div className={styles.cardRight}>{right}</div> : null}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function EmptyState({ title, subtitle, action }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyTitle}>{title}</div>
      <div className={styles.emptySub}>{subtitle}</div>
      {action ? <div className={styles.emptyAction}>{action}</div> : null}
    </div>
  );
}

function OrderStatusStepper({ order }) {
  const stage = getOrderStage(order?.order_status);

  if (stage.kind !== "ok") {
    return (
      <div className={styles.stepperWrap}>
        <div className={styles.stepperHeader}>
          <div className={styles.stepperTitle}>Order Status</div>
          <div className={`${styles.badge} ${stage.kind === "warn" ? styles.badgeWarn : styles.badgeBad}`}>
            {stage.label}
          </div>
        </div>
        <div className={styles.terminalState}>
          <div className={styles.terminalTitle}>{stage.label}</div>
          <div className={styles.terminalHint}>
            This order is marked as <b>{stage.label}</b>.
          </div>
        </div>
      </div>
    );
  }

  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const active = stage.idx;

  return (
    <div className={styles.stepperWrap}>
      <div className={styles.stepperHeader}>
        <div className={styles.stepperTitle}>Order Status</div>
        <div className={`${styles.badge} ${styles.badgeOk}`}>{steps[active] || "Pending"}</div>
      </div>

      <div className={styles.stepper}>
        {steps.map((label, idx) => {
          const done = idx < active;
          const isActive = idx === active;
          return (
            <div key={label} className={styles.step}>
              <div className={[styles.dot, done ? styles.dotDone : "", isActive ? styles.dotActive : ""].join(" ")} />
              <div className={styles.stepLabel}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ✅ Switch button like login page (2 options)
function SwitchTabs({ value, onChange }) {
  return (
    <div className={styles.switchWrap} role="tablist" aria-label="Profile tabs">
      <button
        type="button"
        className={`${styles.switchBtn} ${value === TABS.ACCOUNT ? styles.switchBtnActive : ""}`}
        onClick={() => onChange(TABS.ACCOUNT)}
      >
        <FaUserCog /> Account Settings
      </button>

      <button
        type="button"
        className={`${styles.switchBtn} ${value === TABS.ORDERS ? styles.switchBtnActive : ""}`}
        onClick={() => onChange(TABS.ORDERS)}
      >
        <FaShoppingBag /> My Orders
      </button>

      <span
        className={styles.switchPill}
        style={{ transform: value === TABS.ACCOUNT ? "translateX(0)" : "translateX(100%)" }}
      />
    </div>
  );
}

export default function ProfilePage() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const [tab, setTab] = useState(TABS.ACCOUNT);
  const [userDetails, setUserDetails] = useState(null);

  // Orders
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [filters, setFilters] = useState({
    id: "",
    tracking_id: "",
    order_status: "",
    payment_status: "",
    payment_method: "",
    min_total: "",
    max_total: "",
  });

  const businessOnly = isBusinessPartner(user, userDetails);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/auth`, { withCredentials: true });
      setUser(res.data);
      setIsAuthenticated(true);
      setShowPopup(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      setShowPopup(true);
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const res = await axios.get(`${baseURL}/user/info`, { withCredentials: true });
      setUserDetails({
        firstName: res.data.first_name || "",
        lastName: res.data.last_name || "",
        gender: res.data.gender || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        user_type: res.data.user_type || "",
      });
    } catch (err) {
      console.error("Failed to fetch profile details:", err);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      // 👇 change endpoint if yours differs
      const res = await axios.get(`${baseURL}/user/orders`, { withCredentials: true });
      const list = Array.isArray(res.data) ? res.data : res.data?.orders || [];
      setOrders(list);

      if (!selectedOrderId && list?.length) {
        setSelectedOrderId(list[0].id || list[0].order_id || null);
      }
    } catch (e) {
      console.error("Fetch orders failed:", e);
      setOrdersError(e?.response?.data?.message || "Could not load orders");
      setOrders([]);
      setSelectedOrderId(null);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProfileDetails();
  }, []);

  useEffect(() => {
    if (tab === TABS.ORDERS && isAuthenticated) fetchOrders();
  }, [tab, isAuthenticated]);

  const displayName = useMemo(() => {
    const fn = userDetails?.firstName || "";
    const ln = userDetails?.lastName || "";
    return `${fn} ${ln}`.trim() || user?.username || "User";
  }, [userDetails, user]);

  const filteredOrders = useMemo(() => {
    const f = filters;
    return (orders || []).filter((o) => {
      const idStr = safe(o.id || o.order_id);
      const trackStr = safe(o.tracking_id);
      const os = safe(o.order_status);
      const ps = safe(o.payment_status);
      const pm = safe(o.payment_method);
      const total = Number(o.total_amount || o.total || 0);

      if (f.id && !idStr.includes(f.id.trim())) return false;
      if (f.tracking_id && !trackStr.toLowerCase().includes(f.tracking_id.trim().toLowerCase())) return false;
      if (f.order_status && !os.toLowerCase().includes(f.order_status.trim().toLowerCase())) return false;
      if (f.payment_status && !ps.toLowerCase().includes(f.payment_status.trim().toLowerCase())) return false;
      if (f.payment_method && !pm.toLowerCase().includes(f.payment_method.trim().toLowerCase())) return false;

      if (f.min_total && total < Number(f.min_total || 0)) return false;
      if (f.max_total && total > Number(f.max_total || 0)) return false;

      return true;
    });
  }, [orders, filters]);

  const selectedOrder = useMemo(() => {
    if (!selectedOrderId) return null;
    return (orders || []).find((o) => safe(o.id || o.order_id) === safe(selectedOrderId)) || null;
  }, [orders, selectedOrderId]);

  const handleLogout = async () => {
    try {
      // optional backend logout
      // await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
    } catch {}
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Profile | India Doors</title>
      </Helmet>

      <div className={styles.page}>
        {showPopup && (
          <div className={styles.popup}>
            <p>
              You must be logged in to access your profile. Navigate to <Link to="/login">Login</Link>
            </p>
          </div>
        )}

        {isAuthenticated && (
          <>
            {/* Sticky top */}
            <div className={styles.stickyTop}>
              <div className={styles.stickyInner}>
                <div className={styles.userChip}>
                  <div className={styles.avatar}>{displayName?.slice(0, 1)?.toUpperCase() || "U"}</div>
                  <div className={styles.userMeta}>
                    <div className={styles.userName}>{displayName}</div>
                    <div className={styles.userSub}>
                      {(normalizeUserType(user) || normalizeUserType(userDetails) || "Account")} •{" "}
                      {safe(userDetails?.email || user?.email)}
                    </div>
                  </div>
                </div>

                <SwitchTabs value={tab} onChange={setTab} />

                <button className={styles.logoutBtn} onClick={handleLogout} type="button">
                  Logout
                </button>
              </div>
            </div>

            {/* Body */}
            <div className={styles.content}>
              {/* ACCOUNT SETTINGS: show ALL sections stacked */}
              {tab === TABS.ACCOUNT && (
                <div className={styles.stack}>
                  <SectionCard
                    title="Personal Information"
                    subtitle="Update your details used for billing, invoices and contact."
                  >
                    {userDetails ? (
                      <ProfileInfo userDetails={userDetails} />
                    ) : (
                      <EmptyState title="Loading profile..." subtitle="Fetching your details" />
                    )}
                  </SectionCard>

                  <SectionCard
                    title="Manage Addresses"
                    subtitle="Billing and Shipping addresses used during checkout."
                  >
                    <div className={styles.splitCards}>
                      <div className={styles.miniCard}>
                        <div className={styles.miniTitle}>Billing Address</div>
                        <AddressForm header="Billing address" />
                      </div>

                      <div className={styles.miniCard}>
                        <div className={styles.miniTitle}>Shipping Address</div>
                        <AddressForm header="Shipping address" />
                      </div>
                    </div>
                  </SectionCard>

                  {/* Business Partner Only */}
                  {businessOnly && (
                    <>
                      <SectionCard
                        title="My Documents"
                        subtitle="Upload business KYC documents (Aadhaar, PAN, etc)."
                      >
                        <div className={styles.docsGrid}>
                          {[
                            { key: "aadhaar", title: "Aadhaar", hint: "PDF/JPG/PNG" },
                            { key: "pan", title: "PAN", hint: "PDF/JPG/PNG" },
                            { key: "gst", title: "GST Certificate", hint: "Optional" },
                          ].map((d) => (
                            <div key={d.key} className={styles.docCard}>
                              <div className={styles.docTop}>
                                <FaFileAlt />
                                <div>
                                  <div className={styles.docTitle}>{d.title}</div>
                                  <div className={styles.docHint}>{d.hint}</div>
                                </div>
                              </div>

                              <div className={styles.docActions}>
                                <label className={styles.uploadBtn}>
                                  <FaFileUpload /> Upload
                                  <input type="file" style={{ display: "none" }} />
                                </label>
                                <button type="button" className={styles.ghostBtn} disabled>
                                  View
                                </button>
                              </div>

                              <div className={styles.docNote}>
                                Wire backend later: store file path + status in DB.
                              </div>
                            </div>
                          ))}
                        </div>
                      </SectionCard>

                      <SectionCard title="My Privileges" subtitle="Partner program benefits and perks.">
                        <div className={styles.perks}>
                          <div className={styles.perkCard}>
                            <div className={styles.perkTitle}>
                              <FaCrown /> Partner Pricing
                            </div>
                            <div className={styles.perkText}>Access partner-specific discounts when enabled.</div>
                          </div>
                          <div className={styles.perkCard}>
                            <div className={styles.perkTitle}>
                              <FaCrown /> Priority Support
                            </div>
                            <div className={styles.perkText}>Faster handling for order & delivery queries.</div>
                          </div>
                          <div className={styles.perkCard}>
                            <div className={styles.perkTitle}>
                              <FaCrown /> Bulk Ordering
                            </div>
                            <div className={styles.perkText}>Optimized checkout for multiple items and addresses.</div>
                          </div>
                        </div>
                      </SectionCard>
                    </>
                  )}
                </div>
              )}

              {/* ORDERS: show both sections stacked */}
              {tab === TABS.ORDERS && (
                <div className={styles.stack}>
                  <SectionCard
                    title="All Orders"
                    subtitle="Select an order with the radio button to view its status timeline below."
                    right={
                      <button
                        className={styles.refreshBtn}
                        onClick={fetchOrders}
                        type="button"
                        disabled={ordersLoading}
                      >
                        <FaSyncAlt /> Refresh
                      </button>
                    }
                  >
                    <div className={styles.filters}>
                      <div className={styles.filtersTitle}>
                        <FaFilter /> Filters
                      </div>

                      <div className={styles.filtersGrid}>
                        <input
                          className={styles.filterInput}
                          placeholder="Order ID"
                          value={filters.id}
                          onChange={(e) => setFilters((p) => ({ ...p, id: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Tracking ID"
                          value={filters.tracking_id}
                          onChange={(e) => setFilters((p) => ({ ...p, tracking_id: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Order Status"
                          value={filters.order_status}
                          onChange={(e) => setFilters((p) => ({ ...p, order_status: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Payment Status"
                          value={filters.payment_status}
                          onChange={(e) => setFilters((p) => ({ ...p, payment_status: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Payment Method"
                          value={filters.payment_method}
                          onChange={(e) => setFilters((p) => ({ ...p, payment_method: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Min Total"
                          value={filters.min_total}
                          onChange={(e) => setFilters((p) => ({ ...p, min_total: e.target.value }))}
                        />
                        <input
                          className={styles.filterInput}
                          placeholder="Max Total"
                          value={filters.max_total}
                          onChange={(e) => setFilters((p) => ({ ...p, max_total: e.target.value }))}
                        />
                        <button
                          type="button"
                          className={styles.clearFiltersBtn}
                          onClick={() =>
                            setFilters({
                              id: "",
                              tracking_id: "",
                              order_status: "",
                              payment_status: "",
                              payment_method: "",
                              min_total: "",
                              max_total: "",
                            })
                          }
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    {ordersError ? (
                      <EmptyState title="Could not load orders" subtitle={ordersError} />
                    ) : ordersLoading ? (
                      <EmptyState title="Loading orders..." subtitle="Fetching your latest orders" />
                    ) : filteredOrders?.length ? (
                      <div className={styles.tableWrap}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Select</th>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Payment</th>
                              <th>Total</th>
                              <th>Tracking</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOrders.map((o) => {
                              const oid = safe(o.id || o.order_id);
                              const active = safe(selectedOrderId) === oid;
                              const stage = getOrderStage(o.order_status);

                              return (
                                <tr key={oid} className={active ? styles.rowActive : ""}>
                                  <td>
                                    <input
                                      type="radio"
                                      name="selectedOrder"
                                      checked={active}
                                      onChange={() => setSelectedOrderId(oid)}
                                    />
                                  </td>

                                  <td>
                                    <div className={styles.cellMain}>#{oid}</div>
                                    <div className={styles.cellSub}>{safe(o.currency || "INR")}</div>
                                  </td>

                                  <td>
                                    <div className={styles.cellMain}>
                                      {toDateTimeIN(o.order_date || o.created_at)}
                                    </div>
                                  </td>

                                  <td>
                                    <span
                                      className={[
                                        styles.pill,
                                        stage.kind === "ok"
                                          ? styles.pillOk
                                          : stage.kind === "warn"
                                          ? styles.pillWarn
                                          : styles.pillBad,
                                      ].join(" ")}
                                    >
                                      {safe(o.order_status)}
                                    </span>
                                  </td>

                                  <td>
                                    <div className={styles.cellMain}>{safe(o.payment_method)}</div>
                                    <div className={styles.cellSub}>{safe(o.payment_status)}</div>
                                  </td>

                                  <td>
                                    <div className={styles.cellMain}>₹{money(o.total_amount || o.total)}</div>
                                    <div className={styles.cellSub}>Ship ₹{money(o.shipping_fee || 0)}</div>
                                  </td>

                                  <td>
                                    <div className={styles.cellMain}>{safe(o.tracking_id)}</div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <EmptyState title="No orders found" subtitle="Try clearing filters or place an order." />
                    )}
                  </SectionCard>

                  <SectionCard
                    title="Order Status"
                    subtitle="The timeline updates based on the selected order above."
                  >
                    {selectedOrder ? (
                      <>
                        <OrderStatusStepper order={selectedOrder} />

                        <div className={styles.details}>
                          <div className={styles.kvGrid}>
                            <div className={styles.kv}>
                              <div className={styles.k}>Order ID</div>
                              <div className={styles.v}>#{safe(selectedOrder.id || selectedOrder.order_id)}</div>
                            </div>

                            <div className={styles.kv}>
                              <div className={styles.k}>Order Date</div>
                              <div className={styles.v}>
                                {toDateTimeIN(selectedOrder.order_date || selectedOrder.created_at)}
                              </div>
                            </div>

                            <div className={styles.kv}>
                              <div className={styles.k}>Payment</div>
                              <div className={styles.v}>
                                {safe(selectedOrder.payment_method)} ({safe(selectedOrder.payment_status)})
                              </div>
                            </div>

                            <div className={styles.kv}>
                              <div className={styles.k}>Total</div>
                              <div className={styles.v}>₹{money(selectedOrder.total_amount || selectedOrder.total)}</div>
                            </div>
                          </div>

                          {selectedOrder?.invoice_download_url ? (
                            <a
                              href={selectedOrder.invoice_download_url}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.invoiceBtn}
                            >
                              <FaExternalLinkAlt /> Download Invoice
                            </a>
                          ) : (
                            <div className={styles.invoiceHint}>
                              Invoice link will appear here if your Orders API returns it.
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <EmptyState title="Select an order" subtitle="Pick an order from the table above." />
                    )}
                  </SectionCard>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
