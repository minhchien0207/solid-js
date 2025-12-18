import { Title } from '@solidjs/meta';
import { InsuredPerson, PolicyHolder, Delivery } from '~/types/models';
import Input from '~/components/input/Input';
import Date from '~/components/input/Date';
import DateRange from '~/components/input/DateRange';

export default function Form() {
  return (
    <main>
      <Title>Form</Title>
      <Input
        label="Họ và tên"
        // helper={{ hint: 'Tên chủ hợp đồng' }}
        attr={{
          name: 'name',
          id: 'name',
          placeholder: 'Tên chủ hợp đồng',
          // required: true,
        }}
        onChange={(e) => console.log(e)}
      />
      <Date
        label="Ngày sinh"
        // helper={{ hint: 'dd/mm/yyyy' }}
        attr={{
          name: 'dob',
          id: 'dob',
          placeholder: 'Ngày sinh',
          // required: true,
        }}
        // onChange={(e) => console.log((e.target as HTMLInputElement).value)}
        onChange={(e) => console.log(e)}
      />
      <DateRange
        label="Ngày đi - ngày về"
        // helper={{ hint: 'dd/mm/yyyy - dd/mm/yyyy' }}
        attr={{
          name: 'dob',
          id: 'dob',
          placeholder: 'Chọn ngày đi - ngày về',
          // required: true,
        }}
        // onChange={(e) => console.log((e.target as HTMLInputElement).value)}
        onChange={(e) => console.log(e)}
      />
    </main>
  );
}
