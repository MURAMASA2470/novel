import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import type { Component, JSX } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import type { SceneModel } from '../../models/SceneModel';
import { SceneText } from '../../models/SceneText';
import SceneFlow from '../../components/scene/SceneFlow';

const flow: JSX.Element = (
  <>
    <div>

    </div>
  </>
)

const scene: SceneModel = {
  backGroundImage: "/src/assets/project/image/background/cg1.png",
  characterList: [new Map([["木村圭祐", ""]])],
  sceneText: {
    characterName: "山本侑弥",
    textList: [
      "サンプルテキスト1行目",
      "サンプルテキスト2行目",
      "サンプルテキスト折り返しサンプルテキスト折り返しサンプルテキスト折り返しサンプルテキスト折り返しサンプルテキスト折り返し"
    ]
  }
}

const data: PalletType[] = [
  { title: "Motion", content: <></>, width: "22.5vw", height: "calc(45.5vh - 10px - 13px)" },
  { title: "Main", content: <SceneRenderer scene={scene} />, width: "50vw", height: "calc(50vh - 10px  - 13px)" },
  { title: "Flow", content: <SceneFlow />, width: "25vw", height: "calc(91vh - 13px)" },
  { title: "Media", content: <></>, width: "22.5vw", height: "45.5vh" },
  { title: "Mitei", content: <></>, width: "50vw", height: "41vh" },
]

const Scene: Component = () => {
  return (
    <Masonry
      breakpointCols={{ default: 3 }}
      className={styles.my_masonry_grid}
      columnClassName={styles.my_masonry_grid_column}
      each={data}
    >
      {(item: PalletType) => (
        <Palette width={item.width} height={item.height}>
          {item.content}
        </Palette>
      )}
    </Masonry>
  );
};

export default Scene;
