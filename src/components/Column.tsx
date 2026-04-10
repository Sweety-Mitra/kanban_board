type ColumnProps = {
  title: string;
};

const Column = ({ title }: ColumnProps) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        minHeight: "300px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default Column;