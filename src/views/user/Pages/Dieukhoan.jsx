import React from 'react';

const Dieukhoan = () => {
  return (
    <div className='container'>
      <h1 className='fw-bold text-center'>Chính Sách & Điều Khoản Mua Hàng
      </h1>
      <div className='mt-5'>
        <h5>I. Điều khoản sử dụng</h5>
        <p>
            Khi quý khách truy cập vào trang web của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này.
            Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Quy định và Điều kiện sử dụng,
            vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước.
            Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi được đăng tải, có nghĩa là quý khách
            chấp nhận với những thay đổi đó.
        </p>
        <h6>1. Hướng dẫn sử dụng web</h6>
            <ul>
                <li>Khi vào web của chúng tôi, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp.</li>
                <li>Chúng tôi cấp giấy phép sử dụng để bạn có thể mua sắm trên web trong khuôn khổ điều khoản và điều kiện sử dụng đã đề ra.</li>
                <li>Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản.</li>
                <li>Trang web này chỉ dùng để cung cấp thông tin sản phẩm của chúng tôi không phải nhà sản xuất nên những nhận xét hiển thị trên web là ý kiến cá nhân của khách hàng, không phải của chúng tôi.</li>
                <li>Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên web.</li>
                <li>Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Sau đó, nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào link ở dưới cùng trong mỗi email quảng cáo.</li>
            </ul>
            <h6>2. Hướng dẫn mua sắm</h6>
            <p>
                Để mua hàng, quý khách vui lòng thực hiện các bước sau:
            </p>
            <ol>
                <li>Chọn sản phẩm bạn muốn mua và thêm vào giỏ hàng.</li>
                <li>Kiểm tra lại thông tin đơn hàng trong giỏ hàng và xác nhận thông tin thanh toán.</li>
                <li>Chọn phương thức thanh toán và điền thông tin thanh toán chính xác.</li>
                <li>Xác nhận đơn hàng và hoàn tất quá trình thanh toán.</li>
            </ol>
        <h5>II. Điều khoản không hoàn tiền</h5>
        <p>
          Sau khi quý khách xác nhận thanh toán, tất cả các giao dịch sẽ không thể hoàn lại. Xin quý khách lưu ý kiểm tra kỹ trước khi thực hiện thanh toán để đảm bảo rằng các thông tin và sản phẩm bạn chọn là chính xác.
        </p>
        <h5>III. Chấp nhận đơn hàng và giá cả</h5>
        <ul>
                <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ lý do gì vào bất kỳ lúc nào. Chúng tôi có thể hỏi thêm về số điện thoại và địa chỉ trước khi nhận đơn hàng.</li>
                <li>Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra, 
                    ví dụ như trường hợp giá sản phẩm không hiển thị chính xác trên trang web hoặc sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách.
                     Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã bị thanh toán.
                </li>
        </ul>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mb-3">Đồng ý và tiếp tục</button>
            </div>
      </div>
    </div>
  );
};

export default Dieukhoan;
