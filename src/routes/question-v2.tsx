import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
// import { A } from '@solidjs/router';
import { Title } from "@solidjs/meta";
import { createStore } from "solid-js/store";
import { initial as faq } from "~/routes/question";
import Modal from "~/components/modal/Modal";

export default function QuestionPage() {
  const [state, setState] = createStore<{
    modalActive?: {
      id?: string;
      title?: string;
      body?: any;
      style?: string;
    };
    data?: any;
  }>({
    data: {
      faq_modal: {
        content: faq,
        style: "lg:max-w-5xl",
      },
      list_document_modal: {
        content: [
          {
            title: "Quy tắc bảo hiểm (Toàn diện)",
            link: "https://ecom-uat.msig.com.vn/assets/documents/Policy_Wording_TravelEasy_Comprehensive_VN.pdf",
          },
          {
            title: "Quy tắc bảo hiểm (Một quyền lợi)",
            link: "https://ecom-uat.msig.com.vn/assets/documents/Policy_Wording_TravelEasy_Single_Benefit.pdf",
          },
          {
            title: "Hướng dẫn thủ tục khiếu nại bồi thường",
            link: "https://ecom-uat.msig.com.vn/assets/documents/Travel_Claim_Guidelines_VN.pdf",
          },
          {
            title: "Đơn yêu cầu bồi thường",
            link: "https://ecom-uat.msig.com.vn/assets/documents/Travel_Claim_Form.pdf",
          },
          {
            title: "Mẫu biên bản tường tình",
            link: "https://ecom-uat.msig.com.vn/assets/documents/claim_report.doc",
          },
        ],
      },
    },
  });

  const handleModalChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const modalId = target.dataset.modalId || "";
    setState({
      modalActive: {
        id: modalId,
        title: target.dataset.modalTitle || "",
        body: state?.data?.[modalId]?.content,
        style: state?.data?.[modalId]?.style,
      },
    });
  };

  const handleModalClose = () => {
    setState({
      modalActive: {
        id: undefined,
        title: "",
        body: undefined,
        style: undefined,
      },
    });
  };

  return (
    <>
      <Title>Question v2</Title>
      <div class="relative w-full">
        <div class="h-[1000px]"></div>
        <div class="fab sticky right-5 bottom-5">
          <div
            tabindex="0"
            role="button"
            class="btn flex items-center gap-2 rounded-full transition-all duration-200"
          >
            <div class="size-[15px] bg-black mask-[url('/images/question-mark.svg')] mask-center mask-no-repeat opacity-60"></div>
            <span class="">Hỏi đáp</span>
          </div>

          {/* version hover button show text */}
          {/* <div
            tabindex="0"
            role="button"
            class="btn group flex items-center gap-2 rounded-full lg:grid lg:grid-cols-[auto_0fr] lg:gap-0 lg:overflow-hidden lg:transition-[grid-template-columns] lg:duration-300 lg:ease-in-out lg:hover:grid-cols-[auto_1fr] lg:focus-visible:grid-cols-[auto_1fr]"
          >
            <div class="size-[15px] bg-black mask-[url('/images/question-mark.svg')] mask-center mask-no-repeat opacity-60"></div>

            <span class="whitespace-nowrap lg:ml-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:delay-100 lg:duration-200 lg:group-hover:ml-2 lg:group-hover:opacity-100 lg:group-focus-visible:ml-2 lg:group-focus-visible:opacity-100">
              Hỏi đáp
            </span>
          </div> */}

          <div class="fab-close">
            Đóng&nbsp;<span class="btn btn-circle btn-error">✕</span>
          </div>

          <div>
            Câu hỏi thường gặp&nbsp;
            <label
              class="btn btn-lg btn-circle"
              data-modal-id="faq_modal"
              data-modal-title="Câu hỏi thường gặp"
              onclick={handleModalChange}
              for="faq_modal"
            >
              <div
                class="bg-primary size-[15px] mask-[url('/images/faq.svg')] mask-center mask-no-repeat"
                data-modal-id="faq_modal"
                data-modal-title="Câu hỏi thường gặp"
                onclick={(e) => {
                  e.stopPropagation();
                  handleModalChange(e);
                }}
              ></div>
            </label>
          </div>
          <div>
            Tài liệu sản phẩm&nbsp;
            <label
              class="btn btn-lg btn-circle"
              data-modal-id="list_document_modal"
              data-modal-title="Tài liệu sản phẩm"
              onclick={handleModalChange}
              for="list_document_modal"
            >
              <div
                class="bg-primary size-[15px] mask-[url('/images/list_document.svg')] mask-center mask-no-repeat"
                data-modal-id="list_document_modal"
                data-modal-title="Tài liệu sản phẩm"
                onclick={(e) => {
                  e.stopPropagation();
                  handleModalChange(e);
                }}
              ></div>
            </label>
          </div>
        </div>
      </div>

      <Show when={state?.modalActive?.id} keyed>
        <Modal
          attr={{
            id: state?.modalActive?.id,
            class: {
              label:
                "btn flex items-center gap-2 rounded-[20px] bg-[#D8DEEE] font-bold text-[#474653]",
              ...(state?.modalActive?.style && {
                modal: state?.modalActive?.style,
              }),
            },
          }}
          fncHandleClose={handleModalClose}
          title={state?.modalActive?.title}
          body={state?.modalActive?.body?.map((item, index) => {
            const tag = () => (item?.answers?.length > 0 ? "details" : "div");
            const titleTag = () => (item?.link ? "a" : "summary");

            return (
              <Dynamic
                component={tag()}
                class="bg-base-100 border-base-300 text-primary collapse border"
                classList={{
                  "collapse-arrow": item?.answers?.length > 0,
                }}
                name="content_modal"
              >
                <Dynamic
                  component={titleTag()}
                  href={item?.link}
                  class="collapse-title text-base/[22px] font-semibold max-sm:text-pretty lg:whitespace-nowrap"
                  classList={{
                    "flex items-center p-4 justify-between after:bg-primary":
                      item?.link,
                  }}
                >
                  {item?.title ?? item?.question}
                </Dynamic>
                {item?.answers?.length > 0 && (
                  <div class="collapse-content text-regular text-sm/[25px]">
                    <ul
                      role="list"
                      class="list-disc text-pretty marker:text-[#474653]"
                    >
                      {item?.answers?.map((answer: string) => (
                        <li class="ml-5 text-justify">{answer}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Dynamic>
            );
          })}
        ></Modal>
      </Show>
    </>
  );
}
