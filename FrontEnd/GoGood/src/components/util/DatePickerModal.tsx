import React from 'react';
import DatePicker from 'react-native-date-picker';

export function DatePickerModal({
  setIsModalVisible,
  setDate,
}: {
  setIsModalVisible: Function;
  setDate: Function;
}) {
  // const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <DatePicker
        modal
        // open={open}
        date={new Date()}
        onConfirm={date => {
          setIsModalVisible(false);
          setDate(date);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </React.Fragment>
  );
}
