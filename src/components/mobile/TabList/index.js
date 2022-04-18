import "./style.css";

export default function TabList({ list, activeIndex, onClick }) {
  return (
    <div className="mobile-tab_list">
      <div className="mobile-tab_list-items">
        {list.map((value, index) => {
          const active = activeIndex === value.id;
          return (
            <div
              key={index}
              className={`d-flex align-items-center justify-content-center h-100 items-title ${
                active ? "active" : ""
              }`}
              onClick={() => onClick(value.id)}
            >
              <h3
                className={`${
                  active ? "subhead100 text-primary-1" : "body100"
                }`}
              >
                {value.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
