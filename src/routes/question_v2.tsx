import { Title } from '@solidjs/meta';
import { createStore } from 'solid-js/store';
import { initial as data } from '~/routes/question';

export default function QuestionPage() {
  const [state, setState] = createStore<{
    data: any[];
  }>({
    data: data,
  });

  return (
    <>
      <Title>Question</Title>
      <div class="relative w-full">
        <div class="h-[1000px]"></div>
        <div class="fab sticky right-5 bottom-5">
          {/* <label for={attr?.id} class={attr?.class}>
            <div class="h-[15px] w-[15px] bg-black mask-[url('/images/question-mark.svg')] mask-center mask-no-repeat opacity-60"></div>
            <span class="">Hỏi đáp</span>
          </label> */}

          {/* <Modal
            attr={{
              id: 'faq_modal',
              class:
                'btn flex items-center gap-2 rounded-[20px] bg-[#D8DEEE] font-bold text-[#474653]',
            }}
            title="Các câu hỏi thường gặp"
            body={state.data.map((item, index) => (
              <details
                class="collapse-arrow bg-base-100 border-base-300 text-primary collapse border"
                name="faq"
              >
                <summary class="collapse-title text-[16px] leading-[22px] font-semibold max-sm:text-pretty lg:whitespace-nowrap">
                  {item.question}
                </summary>
                <div class="collapse-content text-regular text-[14px] leading-[25px]">
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
            <div class="h-[15px] w-[15px] bg-black mask-[url('/images/question-mark.svg')] mask-center mask-no-repeat opacity-60"></div>
            <span class="">Hỏi đáp</span>
          </Modal> */}
        </div>
      </div>
    </>
  );
}
