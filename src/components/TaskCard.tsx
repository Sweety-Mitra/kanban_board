type TaskCardProps = {
    title: string;
    description?: string;
};

const TaskCard = ({ title, description }: TaskCardProps) => {
    return (
        <div
            style={{
                background: "#fff",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
        >
            <h4>{title}</h4>
            {description && <p>{description}</p>}
        </div>
    );
};

export default TaskCard;