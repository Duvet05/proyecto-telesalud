const ScheduleChip = ({ start, end, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`[word-wrap: break-word] m-4 h-10 cursor-pointer grid items-center rounded-lg px-[12px] 
            ${
              isSelected
                ? "bg-orange-500 text-white"
                : "bg-[#e2e7eb] text-[#4f4f4f]"
            }`}
    >
      {start}
    </div>
  );
};

export default ScheduleChip;
