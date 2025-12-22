export default function Footer() {
  return (
    <footer class="footer footer-horizontal footer-center bg-primary gap-4.5 rounded p-10 text-white">
      <div class="flex gap-4.5 max-sm:flex-row lg:flex-col">
        <nav class="max-sm:order-2 lg:order-1">
          <div class="grid grid-flow-col gap-4">
            {/* facebook */}
            <a href="https://www.facebook.com/msigvn" target="blank">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3337_14776)">
                  <path
                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3337_14776">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/msigvn" target="blank">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3337_14785)">
                  <path
                    d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3337_14785">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {/* youtube */}
            {/* <a href="https://www.youtube.com/@msigvn" target="blank">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.7609 7.20005C23.7609 7.20005 23.5266 5.54536 22.8047 4.8188C21.8906 3.86255 20.8688 3.85786 20.4 3.80161C17.0438 3.55786 12.0047 3.55786 12.0047 3.55786H11.9953C11.9953 3.55786 6.95625 3.55786 3.6 3.80161C3.13125 3.85786 2.10938 3.86255 1.19531 4.8188C0.473438 5.54536 0.24375 7.20005 0.24375 7.20005C0.24375 7.20005 0 9.14536 0 11.086V12.9047C0 14.8454 0.239062 16.7907 0.239062 16.7907C0.239062 16.7907 0.473437 18.4454 1.19062 19.1719C2.10469 20.1282 3.30469 20.0954 3.83906 20.1985C5.76094 20.3813 12 20.4375 12 20.4375C12 20.4375 17.0438 20.4282 20.4 20.1891C20.8688 20.1329 21.8906 20.1282 22.8047 19.1719C23.5266 18.4454 23.7609 16.7907 23.7609 16.7907C23.7609 16.7907 24 14.85 24 12.9047V11.086C24 9.14536 23.7609 7.20005 23.7609 7.20005ZM9.52031 15.1125V8.36724L16.0031 11.7516L9.52031 15.1125Z"
                fill="white"
              />
            </svg>
          </a> */}
          </div>
        </nav>
        <nav class="grid gap-4 max-sm:order-1 max-sm:grid-cols-1 max-sm:text-left lg:order-2 lg:grid-flow-col">
          <a
            href="https://www.msig.com.vn/vi/dieu-khoan-su-dung"
            target="blank"
            class="link link-hover"
          >
            Điều khoản sử dụng
          </a>
          <a
            href="https://www.msig.com.vn/vi/chinh-sach-bao-mat"
            target="blank"
            class="link link-hover"
          >
            Chính sách Bảo mật và Quyền riêng tư
          </a>
          <a href="#" target="blank" class="link link-hover">
            Điều khoản cung cấp sản phẩm trên môi trường mạng
          </a>
        </nav>
      </div>
      <aside>
        <p>
          Bản quyền được bảo hộ. Bản quyền © {new Date().getFullYear()} Công ty
          TNHH Bảo hiểm Phi nhân thọ MSIG Việt Nam.
        </p>
      </aside>
    </footer>
  );
}
