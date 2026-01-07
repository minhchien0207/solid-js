import { Title } from "@solidjs/meta";
import { createStore } from "solid-js/store";
import Modal from "~/components/modal/Modal";

export const initial = [
  {
    question: "Làm thế nào để yêu cầu bồi thường Bảo hiểm du lịch?",
    answers: [
      [
        "Quý khách có thể tải Hướng dẫn thủ tục khiếu nại bổi thường Bảo hiểm du lịch ",
        <a
          class="font-bold text-[#FF0000] underline decoration-1"
          href="https://ecom-uat.msig.com.vn/assets/documents/Travel_Claim_Guidelines_VN.pdf"
        >
          tại đây
        </a>,
        " hoặc liên hệ với chúng tôi theo số điện thoại ",
        <a class="font-bold text-[#FF0000]" href="tel:0888176198">
          0888 176 198
        </a>,
        " theo giờ hành chính để được giải đáp thắc mắc.",
      ],
      "Tôi cam kết và xác nhận những thông tin đã cung cấp là đúng sự thực, đầy đủ và chính xác. Tôi xin chịu trách nhiệm hoàn toàn trước pháp luật về toàn bộ thông tin đã cung cấp và hiểu rằng MSIG Việt Nam sẽ không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào, bất kể là trực tiếp hay gián tiếp, gây ra do việc cung cấp thông tin không đầy đủ và/hoặc cung cấp thông tin không chính xác.",
    ],
  },
  {
    question:
      "Tổng đài hỗ trợ du lịch toàn cầu 24/7 cung cấp những dịch vụ gì?",
    answers: [
      "Tổng đài hỗ trợ dịch vụ toàn cầu 24/7 của MSIG Việt Nam cung cấp các dịch vụ hỗ trợ y tế khẩn cấp, bao gồm: Cấp cứu y tế khẩn cấp, giới thiệu dịch vụ y tế và Bảo lãnh viện phí.",
      "Quý khách có thể liên hệ Tổng đài để được tư vấn hướng dẫn thủ tục bồi thường khi ở nước ngoài để có thể thu thập đủ thông tin cần thiết cho việc bồi thường ở Việt Nam.",
    ],
  },
  {
    question: "Tôi nên yêu cầu bồi thường sau bao lâu?",
    answers: [
      "Mọi yêu cầu bồi thường phải được thông báo hoặc gửi bằng văn bản tới văn phòng MSIG Việt Nam trong vòng tối đa 30 ngày kể từ ngày phát sinh sự kiện bảo hiểm.",
    ],
  },
  {
    question:
      "Tôi cần làm gì khi trường hợp máy bay bị trễ chuyến do hỏng động cơ và hãng hàng không không thể cung cấp thư xác nhận?",
    answers: [
      "Để hỗ trợ yêu cầu bồi thường, Quý khách vui lòng liên hệ với đại lý của các hãng hàng không hoặc gặp nhân viên phụ trách vấn đề này tại sân bay ngay khi có thông tin về chuyến bay bị hoãn để yêu cầu xác nhận bằng văn bản. Các hãng bay sẽ luôn hỗ trợ hành khách để cung cấp thông tin này.",
    ],
  },
];

export default function QuestionPage() {
  const [state, setState] = createStore<{
    data: any[];
  }>({
    data: initial,
  });

  return (
    <>
      <Title>Question</Title>
      <div class="relative w-full">
        <div class="h-[1000px]"></div>
        <div class="fab sticky right-5 bottom-5">
          <Modal
            attr={{
              id: "faq_modal",
              class: {
                label:
                  "btn flex items-center gap-2 rounded-[20px] bg-[#D8DEEE] font-bold text-[#474653]",
                modal: "lg:max-w-5xl",
              },
            }}
            title="Các câu hỏi thường gặp"
            body={state.data.map((item, index) => (
              <details
                class="collapse-arrow bg-base-100 border-base-300 text-primary collapse border"
                name="faq"
              >
                <summary class="collapse-title text-base/[22px] font-semibold max-sm:text-pretty lg:whitespace-nowrap">
                  {item.question}
                </summary>
                <div class="collapse-content text-regular text-sm/[25px]">
                  <ul
                    role="list"
                    class="list-disc text-pretty marker:text-[#474653]"
                  >
                    {item.answers.map((answer: string) => (
                      <li class="ml-5 text-justify">{answer}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          >
            <div class="size-[15px] bg-black mask-[url('/images/question-mark.svg')] mask-center mask-no-repeat opacity-60"></div>
            <span class="">Hỏi đáp</span>
          </Modal>
        </div>
      </div>
    </>
  );
}
