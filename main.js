'use strict';
const danhSachLoaiSuCo = [
  { ma: 'den-duong', ten: 'Đèn đường', bieuTuong: 'bieu-tuong-khien' },
  { ma: 'o-ga', ten: 'Ổ gà', bieuTuong: 'bieu-tuong-canh-bao' },
  { ma: 'cay-xanh', ten: 'Cây xanh', bieuTuong: 'bieu-tuong-canh-bao' },
  { ma: 'vat-can', ten: 'Vật cản', bieuTuong: 'bieu-tuong-canh-bao' }
];
const danhSachMucKhanCap = [
  { ma: 'thap', ten: 'Thấp' }, { ma: 'trung-binh', ten: 'Trung bình' }, { ma: 'cao', ten: 'Cao' }
];
const danhSachThongBao = [
  { id: 1, noiDung: 'Sự cố #IS-2041 vừa được cập nhật', thoiGian: '2 phút trước', daDoc: false },
  { id: 2, noiDung: 'Nhiệm vụ hiện trường sắp đến hạn', thoiGian: '3 phút trước', daDoc: false },
  { id: 3, noiDung: 'Safe AI có đề xuất ưu tiên mới', thoiGian: '4 phút trước', daDoc: false }
];
const danhSachSuCoTrung = [
  { ma: '#IS-2018', ten: 'Đèn đường hỏng', khoangCach: '48m', thoiGian: '2 ngày trước' },
  { ma: '#IS-1994', ten: 'Mất ánh sáng công cộng', khoangCach: '76m', thoiGian: '5 ngày trước' }
];

let loaiDangChon = 'o-ga';
let mucKhanCapDangChon = 'thap';

const layPhanTu = (id) => document.getElementById(id);
const phanTuToast = layPhanTu('khungToast');
const phanTuTrangThaiAI = layPhanTu('trangThaiAI');
const theAI = document.querySelector('.the-ai');
const oMoTa = layPhanTu('moTa');
const oTieuDe = layPhanTu('tieuDe');

function hienToast(noiDung, kieu = 'xanh-la') {
  const toast = document.createElement('div');
  toast.className = 'toast ' + (kieu === 'xanh-la' ? '' : kieu);
  toast.setAttribute('role', 'status');
  const bieuTuong = kieu === 'vang' ? 'bieu-tuong-canh-bao' : 'bieu-tuong-tich';
  toast.innerHTML = `<svg><use href="#${bieuTuong}"/></svg><span>${noiDung}</span>
    <button type="button" aria-label="Đóng"><svg><use href="#bieu-tuong-dong"/></svg></button>`;
  const dong = () => toast.remove();
  toast.querySelector('button').addEventListener('click', dong);
  phanTuToast.appendChild(toast);
  setTimeout(dong, 4000);
}

function veLoaiSuCo() {
  layPhanTu('luoiLoai').innerHTML = danhSachLoaiSuCo.map((loai) => `
    <button type="button" class="the-loai ${loai.ma === loaiDangChon ? 'dang-chon' : ''}" data-ma="${loai.ma}" aria-pressed="${loai.ma === loaiDangChon}">
      <svg><use href="#${loai.bieuTuong}"/></svg>${loai.ten}</button>`).join('');
}
function veMucKhanCap() {
  layPhanTu('luoiKhanCap').innerHTML = danhSachMucKhanCap.map((muc) => `
    <label class="lua-chon-khan-cap">
      <input type="radio" name="mucKhanCap" value="${muc.ma}" ${muc.ma === mucKhanCapDangChon ? 'checked' : ''}>${muc.ten}</label>`).join('');
}
layPhanTu('luoiLoai').addEventListener('click', (suKien) => {
  const nut = suKien.target.closest('.the-loai');
  if (!nut) return;
  loaiDangChon = nut.dataset.ma;
  veLoaiSuCo();
});
layPhanTu('luoiKhanCap').addEventListener('change', (suKien) => {
  mucKhanCapDangChon = suKien.target.value;
});

function hienLoi(idLoi, oNhap) { layPhanTu(idLoi).hidden = false; oNhap.closest('.nhom-truong').classList.add('co-loi'); }
function anLoi(idLoi, oNhap) { layPhanTu(idLoi).hidden = true; oNhap.closest('.nhom-truong').classList.remove('co-loi'); }

oMoTa.addEventListener('input', () => {
  layPhanTu('demKyTu').textContent = oMoTa.value.length;
  anLoi('loiMoTa', oMoTa);
});
oTieuDe.addEventListener('input', () => anLoi('loiTieuDe', oTieuDe));

layPhanTu('bieuMauSuCo').addEventListener('submit', (suKien) => {
  suKien.preventDefault();
  let hopLe = true;
  if (oTieuDe.value.trim() === '') { hienLoi('loiTieuDe', oTieuDe); hopLe = false; } else anLoi('loiTieuDe', oTieuDe);
  if (oMoTa.value.trim().length < 10) { hienLoi('loiMoTa', oMoTa); hopLe = false; } else anLoi('loiMoTa', oMoTa);
  if (!hopLe) {
    hienToast('Vui lòng điền đầy đủ thông tin bắt buộc', 'do');
    document.querySelector('.co-loi input, .co-loi textarea').focus();
    return;
  }
  const cacBuoc = document.querySelectorAll('#cacBuoc .buoc');
  cacBuoc[1].className = 'buoc da-xong';
  cacBuoc[1].querySelector('.vong').innerHTML = '<svg width="16" height="16"><use href="#bieu-tuong-tich"/></svg>';
  cacBuoc[2].classList.add('dang-lam');
  hienToast('Báo cáo đã được gửi. Mã theo dõi: #IS-2042');
});
layPhanTu('nutQuayLai').addEventListener('click', () => hienToast('Bạn đang ở bước 2. Quay lại bước 1 để đổi vị trí', 'xanh'));

function veThongBao() {
  layPhanTu('danhSachThongBao').innerHTML = danhSachThongBao.map((tb) => `
    <li class="${tb.daDoc ? 'da-doc' : ''}" data-id="${tb.id}"><span class="cham"></span>
      <div><strong>${tb.noiDung}</strong><small>${tb.thoiGian}</small></div></li>`).join('');
  const soChuaDoc = danhSachThongBao.filter((tb) => !tb.daDoc).length;
  layPhanTu('huyHieu').textContent = soChuaDoc;
  layPhanTu('huyHieu').hidden = soChuaDoc === 0;
}
const nutChuong = layPhanTu('nutChuong');
const hopThongBao = layPhanTu('hopThongBao');
function dongHopThongBao() { hopThongBao.hidden = true; nutChuong.setAttribute('aria-expanded', 'false'); }
nutChuong.addEventListener('click', (suKien) => {
  suKien.stopPropagation();
  hopThongBao.hidden = !hopThongBao.hidden;
  nutChuong.setAttribute('aria-expanded', String(!hopThongBao.hidden));
});
hopThongBao.addEventListener('click', (suKien) => {
  suKien.stopPropagation();
  const dong = suKien.target.closest('li');
  if (!dong) return;
  danhSachThongBao.find((tb) => tb.id === Number(dong.dataset.id)).daDoc = true;
  veThongBao();
});
layPhanTu('nutDanhDauDaDoc').addEventListener('click', () => {
  danhSachThongBao.forEach((tb) => (tb.daDoc = true));
  veThongBao();
  hienToast('Đã đánh dấu tất cả là đã đọc');
});
document.addEventListener('click', dongHopThongBao);
document.addEventListener('keydown', (suKien) => {
  if (suKien.key === 'Escape') dongHopThongBao();
  if ((suKien.metaKey || suKien.ctrlKey) && suKien.key.toLowerCase() === 'k') {
    suKien.preventDefault();
    layPhanTu('oTimKiem').focus();
  }
});

function veSuCoTrung() {
  layPhanTu('danhSachTrung').innerHTML = danhSachSuCoTrung.map((s) => `
    <li><strong>${s.ma} · ${s.ten}</strong><small>${s.khoangCach} · ${s.thoiGian}</small></li>`).join('');
}
function datTrangThaiAI(noiDung, kieu, bieuTuong = 'bieu-tuong-tich') {
  phanTuTrangThaiAI.hidden = false;
  phanTuTrangThaiAI.className = 'trang-thai-ai ' + kieu;
  phanTuTrangThaiAI.innerHTML = `<svg><use href="#${bieuTuong}"/></svg>${noiDung}`;
}
function khoaNutAI(khoa) {
  ['nutChapNhan', 'nutSua', 'nutTuChoi', 'nutTaoLai'].forEach((id) => (layPhanTu(id).disabled = khoa));
}
layPhanTu('nutChapNhan').addEventListener('click', () => {
  datTrangThaiAI('Đã áp dụng gợi ý AI', 'tim');
  hienToast('Đã áp dụng đề xuất của Safe AI', 'tim');
});
layPhanTu('nutSua').addEventListener('click', () => {
  datTrangThaiAI('Đã chuyển sang chỉnh sửa thủ công', 'tim');
  hienToast('Bạn có thể chỉnh sửa kết quả thủ công', 'tim');
  oTieuDe.focus();
});
layPhanTu('nutTuChoi').addEventListener('click', () => {
  datTrangThaiAI('Đã bỏ qua gợi ý này', 'vang');
  hienToast('Đã từ chối đề xuất AI', 'vang');
});
layPhanTu('nutTaoLai').addEventListener('click', () => {
  khoaNutAI(true);
  theAI.classList.add('dang-tai');
  datTrangThaiAI('Đang tạo lại kết quả...', 'tim', 'bieu-tuong-ai');
  hienToast('Safe AI đang phân tích lại dữ liệu', 'tim');
  setTimeout(() => {
    theAI.classList.remove('dang-tai');
    khoaNutAI(false);
    datTrangThaiAI('Đã cập nhật kết quả mới', 'tim');
  }, 1600);
});

layPhanTu('chonVaiTro').addEventListener('change', (suKien) => {
  layPhanTu('vaiTroHienTai').textContent = suKien.target.value;
  document.querySelector('.nguoi-dung-tren small').textContent = suKien.target.value;
  hienToast('Đã chuyển sang không gian "' + suKien.target.value + '"', 'xanh');
});
layPhanTu('oTimKiem').addEventListener('keydown', (suKien) => {
  const tuKhoa = suKien.target.value.trim().replace(/[<>&]/g, '');
  if (suKien.key === 'Enter' && tuKhoa) hienToast('Đang tìm "' + tuKhoa + '"...', 'xanh');
});
layPhanTu('nutMenu').addEventListener('click', (suKien) => {
  suKien.stopPropagation();
  layPhanTu('thanhBen').classList.toggle('mo');
});
document.addEventListener('click', (suKien) => {
  if (!suKien.target.closest('#thanhBen')) layPhanTu('thanhBen').classList.remove('mo');
});

veLoaiSuCo();
veMucKhanCap();
veThongBao();
veSuCoTrung();
