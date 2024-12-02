import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Spin, Modal, Button, message } from "antd";

const UserAddresses = () => {
    const [userId, setUserId] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        dia_chi: "",
        phuong: "",
        quan: "",
        thanh_pho: "",
    });
    const [editAddress, setEditAddress] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity] = useState("202");
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    useEffect(() => {
        const accountID = new URLSearchParams(window.location.search).get("userId");
        if (accountID) {
            setUserId(accountID);
            fetchAddresses(accountID);
        }
        const savedAddress = localStorage.getItem("addressCurent");
        if (savedAddress) {
            const parsedAddress = JSON.parse(savedAddress);
            setSelectedAddressId(parsedAddress.dia_chiID); // Khôi phục dia_chiID từ localStorage
        }
    }, []);

    const fetchAddresses = async (accountID) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/auth/users/${accountID}/addresses`);
            if (!response.ok) throw new Error("Failed to fetch addresses");
            const data = await response.json();
            setAddresses(data || []);
        } catch (error) {
            console.error("Error fetching addresses:", error.message);
            setErrorMessage("Không thể tải danh sách địa chỉ.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDistricts = async () => {
        try {
            const response = await axios.post(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                { province_id: parseInt(selectedCity, 10) },
                {
                    headers: {
                        "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                        "Content-Type": "application/json",
                    },
                }
            );
            setDistricts(response.data.data);
        } catch (error) {
            console.error("Error fetching districts:", error.response?.data || error.message);
            setErrorMessage("Không thể tải danh sách quận.");
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await axios.post(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                { district_id: parseInt(districtId, 10) },
                {
                    headers: {
                        "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                        "Content-Type": "application/json",
                    },
                }
            );
            setWards(response.data.data);
        } catch (error) {
            console.error("Error fetching wards:", error.response?.data || error.message);
            setErrorMessage("Không thể tải danh sách phường.");
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);
    const handleUseAddress = (address) => {
        localStorage.setItem("addressCurent", JSON.stringify(address));
        setSelectedAddressId(address.dia_chiID); // Lưu dia_chiID của địa chỉ được chọn
        message.success("Địa chỉ đã được chọn thành công!");
    };


    const handleDistrictChange = (value) => {
        setNewAddress((prev) => ({
            ...prev,
            quan: districts.find((d) => d.DistrictID === value)?.DistrictName || "",
        }));
        fetchWards(value);
    };

    const handleWardChange = (value) => {
        setNewAddress((prev) => ({
            ...prev,
            phuong: wards.find((w) => w.WardCode === value)?.WardName || "",
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!newAddress.dia_chi || !newAddress.phuong || !newAddress.quan) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/auth/users/${userId}/address`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newAddress,
                    thanh_pho: "202",
                }),
            });

            if (!response.ok) throw new Error("Failed to add address");
            setSuccessMessage("Địa chỉ đã được thêm thành công!");
            fetchAddresses(userId);
        } catch (error) {
            console.error("Error adding address:", error.message);
            setErrorMessage("Có lỗi xảy ra khi thêm địa chỉ.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditModalOpen = (address) => {
        setEditAddress(address);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditAddress = async () => {
        if (!editAddress || !editAddress.dia_chiID) {
            setErrorMessage("Không thể cập nhật, thiếu ID địa chỉ.");
            return;
        }

        const { dia_chiID, dia_chi, phuong, quan, thanh_pho } = editAddress;
        const payload = { dia_chi, phuong, quan, thanh_pho };

        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/auth/users/${userId}/addresses/${dia_chiID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) throw new Error("Failed to update address");
            setSuccessMessage("Địa chỉ đã được cập nhật thành công!");
            setEditAddress(null);
            fetchAddresses(userId);
        } catch (error) {
            console.error("Error updating address:", error.message);
            setErrorMessage("Có lỗi xảy ra khi cập nhật địa chỉ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <Link to="/" style={linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={menuStyle}>
                    {[
                        "Thông tin cá nhân",
                        "Lịch sử đặt hàng",
                        "Đổi mật khẩu",
                        "Feedback",
                        "Yêu Thích",
                        "Mã giảm giá",
                        "Địa chỉ của bạn",
                        "Ví đã liên kết",
                    ].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, "-").toLowerCase()}?userId=${userId}`} style={linkStyle}>
                                <button style={buttonStyle}>{item}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="container my-5" style={{ flex: 1 }}>
                <h2 className="text-center mb-4">Quản lý địa chỉ</h2>
                {loading && (
                    <div className="text-center mb-4">
                        <Spin size="large" />
                    </div>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="mb-3">Danh sách địa chỉ</h4>
                        {addresses.length > 0 ? (
                            <ul className="list-group">
                                {addresses.map((address) => (
                                    <li key={address.dia_chiID} className="list-group-item">
                                        <p><strong>Địa chỉ:</strong> {address.dia_chi}</p>
                                        <p><strong>Phường:</strong> {address.phuong}</p>
                                        <p><strong>Quận:</strong> {address.quan}</p>
                                        <p><strong>Thành phố:</strong> {address.thanh_pho === "202" ? "Thành Phố Hồ Chí Minh" : null}</p>
                                        <Button
                                            type="primary"
                                            onClick={() => handleUseAddress(address)}
                                            style={{ marginRight: "10px" }}
                                            disabled={selectedAddressId === address.dia_chiID} // Vô hiệu hóa nếu địa chỉ đang được chọn
                                        >
                                            {selectedAddressId === address.dia_chiID ? "Đang được chọn" : "Sử dụng địa chỉ này"}
                                        </Button>
                                        <Button
                                            type="link"
                                            onClick={() => handleEditModalOpen(address)}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </li>
                                ))}

                            </ul>
                        ) : (
                            <p>Không có địa chỉ nào được lưu.</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-3">Thêm địa chỉ mới</h4>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <form onSubmit={handleAddAddress}>
                            <div className="mb-3">
                                <label htmlFor="dia_chi" className="form-label">Địa chỉ chi tiết</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dia_chi"
                                    name="dia_chi"
                                    value={newAddress.dia_chi}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quận</label>
                                <Select
                                    className="w-100"
                                    placeholder="Chọn quận"
                                    options={districts.map((district) => ({
                                        value: district.DistrictID,
                                        label: district.DistrictName,
                                    }))}
                                    onChange={handleDistrictChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phường</label>
                                <Select
                                    className="w-100"
                                    placeholder="Chọn phường"
                                    options={wards.map((ward) => ({
                                        value: ward.WardCode,
                                        label: ward.WardName,
                                    }))}
                                    onChange={handleWardChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Thêm địa chỉ</button>
                        </form>
                    </div>
                </div>

                {editAddress && (
                    <Modal
                        title="Chỉnh sửa địa chỉ"
                        visible={!!editAddress}
                        onOk={handleEditAddress}
                        onCancel={() => setEditAddress(null)}
                    >
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ chi tiết</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dia_chi"
                                value={editAddress.dia_chi}
                                onChange={(e) =>
                                    setEditAddress({ ...editAddress, dia_chi: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quận</label>
                            <Select
                                className="w-100"
                                placeholder="Chọn quận"
                                options={districts.map((district) => ({
                                    value: district.DistrictID,
                                    label: district.DistrictName,
                                }))}
                                value={districts.find(
                                    (d) => d.DistrictName === editAddress.quan
                                )?.DistrictID}
                                onChange={(value) => {
                                    const selectedDistrict = districts.find(
                                        (d) => d.DistrictID === value
                                    );
                                    setEditAddress({
                                        ...editAddress,
                                        quan: selectedDistrict?.DistrictName || "",
                                        phuong: "",
                                    });
                                    fetchWards(value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phường</label>
                            <Select
                                className="w-100"
                                placeholder="Chọn phường"
                                options={wards.map((ward) => ({
                                    value: ward.WardCode,
                                    label: ward.WardName,
                                }))}
                                value={wards.find((w) => w.WardName === editAddress.phuong)?.WardCode}
                                onChange={(value) => {
                                    const selectedWard = wards.find((w) => w.WardCode === value);
                                    setEditAddress({
                                        ...editAddress,
                                        phuong: selectedWard?.WardName || "",
                                    });
                                }}
                            />
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    );
};

const containerStyle = { display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" };
const sidebarStyle = { width: "250px", backgroundColor: "#2c3e50", color: "#fff", padding: "20px" };
const linkStyle = { textDecoration: "none", color: "white" };
const menuStyle = { listStyleType: "none", padding: "0" };
const buttonStyle = { width: "100%", padding: "12px", backgroundColor: "#34495e", color: "white", border: "none", textAlign: "left", cursor: "pointer", fontSize: "16px", marginBottom: "10px", borderRadius: "5px" };

export default UserAddresses;
