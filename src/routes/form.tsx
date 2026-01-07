import { Title } from "@solidjs/meta";
import { createSignal, Show } from "solid-js";
import Input from "~/components/input/Input";
import Date from "~/components/input/Date";
import DateRange from "~/components/input/DateRange";

export default function Form() {
  const [value, setValue] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [validationError, setValidationError] = createSignal<string | null>(
    null,
  );

  // Giả lập API call
  const checkUsernameAvailable = async (
    username: string,
  ): Promise<string | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Giả lập check username đã tồn tại
    const existingUsernames = ["admin", "user123", "testuser"];
    if (existingUsernames.includes(username.toLowerCase())) {
      return "Tên người dùng đã tồn tại";
    }
    return null;
  };

  // Giả lập API call kiểm tra email
  const checkEmailExists = async (email: string): Promise<string | null> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const existingEmails = ["test@example.com", "admin@example.com"];
    if (existingEmails.includes(email.toLowerCase())) {
      return "Email này đã được đăng ký";
    }
    return null;
  };

  return (
    <main>
      <Title>Form</Title>

      {/* example 1 + 2 */}
      <Input
        label="Tên người dùng"
        value={value()}
        attr={{
          name: "username",
          id: "username",
          placeholder: "Nhập tên người dùng",
          required: true,
        }}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
        validationRules={[
          // Local validation chạy ngay lập tức
          {
            type: "local",
            validator: (val) => {
              if (!val) return "Vui lòng nhập tên người dùng";
              if (val.length < 3)
                return "Tên người dùng phải có ít nhất 3 ký tự";
              if (val.length > 20)
                return "Tên người dùng không được quá 20 ký tự";
              if (!/^[a-zA-Z0-9_]+$/.test(val))
                return "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới";
              return null;
            },
          },
          // API validation chạy sau 500ms debounce
          {
            type: "api",
            validator: checkUsernameAvailable,
          },
        ]}
        debounceTime={500}
        helper={{ hint: "Tên người dùng từ 3-20 ký tự" }}
      />

      {/* example 3 */}
      <Input
        label="Email"
        value={email()}
        attr={{
          name: "email",
          id: "email",
          placeholder: "example@domain.com",
          required: true,
        }}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        validationRules={[
          // Validate format email local
          {
            type: "local",
            validator: (val) => {
              if (!val) return "Vui lòng nhập email";
              const emailRegex =
                /^(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
              if (!emailRegex.test(val)) return "Email không hợp lệ";
              return null;
            },
          },
          // Validate email đã tồn tại qua API
          {
            type: "api",
            validator: checkEmailExists,
          },
        ]}
        debounceTime={800}
        onValidationChange={setValidationError}
        helper={{ hint: "Nhập email hợp lệ" }}
      />

      <Show when={validationError() === null && email()}>
        <p class="mt-2 text-green-600">✓ Email hợp lệ và chưa được sử dụng</p>
      </Show>

      <Date
        label="Ngày sinh"
        // helper={{ hint: 'dd/mm/yyyy' }}
        attr={{
          name: "dob",
          id: "dob",
          placeholder: "Ngày sinh",
          // required: true,
        }}
        // onChange={(e) => console.log((e.target as HTMLInputElement).value)}
        onChange={(e) => console.log(e)}
      />
      <DateRange
        label="Ngày đi - ngày về"
        // helper={{ hint: 'dd/mm/yyyy - dd/mm/yyyy' }}
        attr={{
          name: "dob",
          id: "dob",
          placeholder: "Chọn ngày đi - ngày về",
          // required: true,
        }}
        // onChange={(e) => console.log((e.target as HTMLInputElement).value)}
        onChange={(e) => console.log(e)}
      />
    </main>
  );
}
