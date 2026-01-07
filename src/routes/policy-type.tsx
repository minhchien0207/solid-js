import { Title } from "@solidjs/meta";
import PolicyType from "~/components/policyType/PolicyType";

export default function PolicyTypePage() {
  return (
    <main>
      <Title>Policy Type</Title>
      <PolicyType
        types={[
          {
            text: "Tôi đi một mình",
            value: "individual",
            min: 1,
            max: 1,
            // hint: 'Đơn bảo hiểm cho tối đa %d người.\n Phí bảo hiểm được tính như nhau cho cả người lớn và người phụ thuộc',
          },
          {
            text: "Tôi đi với gia đình",
            value: "family",
            min: 2,
            max: 5,
            hint: "Đơn bảo hiểm cho tối đa %adults người lớn và %children người phụ thuộc.\n Miễn phí bảo hiểm cho người phụ thuộc.",
            adults: {
              text: "Người lớn",
              hint: "(Trên 13 tuổi)",
              default: 2,
              min: 1,
              max: 2,
            },
            children: {
              text: "Người phụ thuộc",
              hint: "(Từ 1 - 13 tuổi)",
              default: 0,
              min: 0,
              max: 3,
            },
          },
          {
            text: "Tôi đi theo nhóm",
            value: "group",
            hint: "Đơn bảo hiểm cho tối đa %d người.\n Phí bảo hiểm được tính như nhau cho cả người lớn và người phụ thuộc",
            min: 1,
            max: 10,
            adults: {
              text: "Người lớn",
              hint: "(Trên 13 tuổi)",
              default: 1,
              min: 1,
            },
            children: {
              text: "Người phụ thuộc",
              hint: "(Từ 1 - 13 tuổi)",
              default: 0,
              min: 0,
            },
          },
        ]}
        onSelect={(value) => console.log(value)}
      />
    </main>
  );
}
