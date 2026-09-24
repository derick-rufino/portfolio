import { useState } from "react";

const Folder = ({
  color = {
    front: "bg-[#5227FF]",
    back: "bg-[#4520D9]",
  },
  size = 1,
  items = [],
  className = "",
}) => {
  const maxItems = 3;

  const papers = items.slice(0, maxItems);

  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);

  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({
      x: 0,
      y: 0,
    })),
  );

  /*
   * Permite usar tanto:
   *
   * color="bg-purple-500"
   *
   * quanto:
   *
   * color={{
   *   front: "bg-purple-500",
   *   back: "bg-purple-600"
   * }}
   */
  const frontColor =
    typeof color === "string" ? color : color?.front || "bg-[#5227FF]";

  const backColor =
    typeof color === "string" ? color : color?.back || frontColor;

  const paper1 = "bg-white/90";
  const paper2 = "bg-white/95";
  const paper3 = "bg-white";

  const handleClick = () => {
    setOpen((prev) => !prev);

    if (open) {
      setPaperOffsets(
        Array.from({ length: maxItems }, () => ({
          x: 0,
          y: 0,
        })),
      );
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;

    setPaperOffsets((prev) => {
      const newOffsets = [...prev];

      newOffsets[index] = {
        x: offsetX,
        y: offsetY,
      };

      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (_, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];

      newOffsets[index] = {
        x: 0,
        y: 0,
      };

      return newOffsets;
    });
  };

  const scaleStyle = {
    transform: `scale(${size})`,
  };

  const getOpenTransform = (index) => {
    if (index === 0) {
      return "translate(-120%, -70%) rotate(-15deg)";
    }

    if (index === 1) {
      return "translate(10%, -70%) rotate(15deg)";
    }

    if (index === 2) {
      return "translate(-50%, -100%) rotate(5deg)";
    }

    return "";
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative cursor-pointer transition-all duration-200 ease-in ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          transform: open ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? "Close folder" : "Open folder"}
      >
        {/* CORPO / PARTE DE TRÁS */}
        <div
          className={`relative h-20 w-25 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] ${backColor}`}
        >
          {/* ABINHA TRASEIRA */}
          <span
            className={`absolute bottom-[98%] left-0 z-0 h-2.5 w-7.5 rounded-tl-[5px] rounded-tr-[5px] ${backColor}`}
          />

          {/* PAPÉIS */}
          {papers.map((item, i) => {
            let sizeClasses = "";

            if (i === 0) {
              sizeClasses = "w-[70%] h-[80%]";
            }

            if (i === 1) {
              sizeClasses = open ? "w-[80%] h-[80%]" : "w-[80%] h-[70%]";
            }

            if (i === 2) {
              sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[60%]";
            }

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute bottom-[10%] left-1/2 z-20 transition-all duration-300 ease-in-out ${
                  !open
                    ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                    : "hover:scale-110"
                } ${sizeClasses} ${
                  i === 0 ? paper1 : i === 1 ? paper2 : paper3
                }`}
                style={{
                  transform: open ? transformStyle : undefined,
                  borderRadius: "10px",
                }}
              >
                {item}
              </div>
            );
          })}

          {/* FRENTE ESQUERDA */}
          <div
            className={`absolute z-30 h-full w-full origin-bottom rounded-[5px_10px_10px_10px] transition-all duration-300 ease-in-out ${
              !open ? "group-hover:transform-[skew(15deg)_scaleY(0.6)]" : ""
            } ${frontColor}`}
            style={{
              ...(open && {
                transform: "skew(15deg) scaleY(0.6)",
              }),
            }}
          />

          {/* FRENTE DIREITA */}
          <div
            className={`absolute z-30 h-full w-full origin-bottom rounded-[5px_10px_10px_10px] transition-all duration-300 ease-in-out ${
              !open ? "group-hover:transform-[skew(-15deg)_scaleY(0.6)]" : ""
            } ${frontColor}`}
            style={{
              ...(open && {
                transform: "skew(-15deg) scaleY(0.6)",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
