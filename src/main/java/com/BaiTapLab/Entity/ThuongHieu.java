package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "thuonghieu")
public class ThuongHieu {
    @Id
    public String thuong_hieuID;

    @Column(columnDefinition = "NVARCHAR(255)")
    public String ten_thuong_hieu;

    public LocalDate ngay_tao;

    @Column(columnDefinition = "NVARCHAR(255)")
    public String hoat_dong;

    @Column(columnDefinition = "NVARCHAR(255)")
    public String trang_thai_xoa;

    public String hinh_anh;

    @OneToMany(mappedBy = "thuonghieu", cascade = CascadeType.ALL)
    @JsonIgnore
    public List<SanPham> sanpham;

    @ManyToOne
    @JoinColumn(name = "accountID")
    public Users users;

    @ManyToOne
    @JoinColumn(name = "nha_cung_capID")
    public NhaCungCap nhacungcap;

    @Override
    public String toString() {
        return "ThuongHieu{" +
                "thuong_hieuID='" + thuong_hieuID + '\'' +
                ", ten_thuong_hieu='" + ten_thuong_hieu + '\'' +
                ", ngay_tao=" + ngay_tao +
                ", hoat_dong='" + hoat_dong + '\'' +
                ", trang_thai_xoa='" + trang_thai_xoa + '\'' +
                ", hinh_anh='" + hinh_anh + '\'' +
                ", users=" + (users != null ? users.getAccountID() : "null") +
                ", nhacungcap=" + (nhacungcap != null ? nhacungcap.getNha_cung_capID() : "null") +
                '}';
    }
}