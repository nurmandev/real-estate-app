import { RecentMessage as MessageType } from "@/hooks/useDashboardStats";

interface Props {
  messages: MessageType[];
}

const statusDot = (status: "success" | "failure") => (
  <span
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: status === "success" ? "#27ae60" : "#e74c3c",
      marginRight: 6,
    }}
  />
);

const RecentMessage = ({ messages }: Props) => {
  return (
    <div className="message-wrapper">
      <div className="message-sidebar border-0">
        <div className="email-read-panel">
          {messages.map((item, idx) => (
            <div
              key={item.id ?? idx}
              className={`email-list-item ${idx === 0 ? "read border-0 pt-0" : ""}`}
            >
              <div className="email-short-preview position-relative">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="sender-name d-flex align-items-center">
                    {statusDot(item.status)}
                    {item.name}
                  </div>
                  <div className="date">{item.date}</div>
                </div>
                <div className="mail-sub">{item.title}</div>
                <div className="mail-text">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentMessage;
