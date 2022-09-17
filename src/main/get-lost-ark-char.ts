/* eslint-disable spaced-comment */
/* eslint-disable consistent-return */
import axios from 'axios';
import ElectronLog from 'electron-log';
import { Auth } from '../renderer/recoil/auth';

const host = `https://lostark.game.onstove.com/Profile/Character/`;

type Char = {
  jobProfileSrc: string;
  name: string;
};

/**
 * 원정대 캐릭터 리스틑 가져 옵니다.
 * @param fId 원정대 캐릭터 이름중 하나를 넣어주세요
 */
async function getCharList(fId: string): Promise<Char[]> {
  return new Promise((resolve) => {
    const api = host + fId;
    axios.get(api).then((res) => {
      const doc = res.data as string;
      /**
       * 보유 캐릭터 파싱
       */
      const result = doc.match(
        /https:\/\/cdn-lostark.game.onstove.com\/2018\/obt\/assets\/images\/common\/thumb\/.*?alt=".*?">.*?<\/span>/g,
      );

      if (result === undefined || result === null) return [];

      const nameList = result.map((charInfo) => {
        const matchInfo = /(https.*?)".*?alt="(.*?)".*?(Lv.*?)<span>(.*?)<\/span>/g.exec(
          charInfo,
        );

        if (matchInfo === null) {
          throw Error('정상적인 파싱 결과물이 아닙니다.');
        }

        return {
          jobProfileSrc: matchInfo[1],
          name: matchInfo[4],
        };
      });
      resolve(nameList);
    });
  });
}

function getCharInfo(char: Char): Promise<Auth> {
  return new Promise((resolve) => {
    const { name, jobProfileSrc } = char;
    const api = host + encodeURIComponent(name);
    axios.get(api).then((v) => {
      const str = v.data as string;

      //#region 장착 아이템 레벨 파싱
      const matchItemLevelInfo = /장착 아이템 레벨.*?Lv..*?>(.*?)</g.exec(str);

      if (matchItemLevelInfo === null) {
        throw Error('정상적인 장착 아이템 레벨 파싱 결과물이 아닙니다.');
      }

      const itemLevel = parseInt(matchItemLevelInfo[1].replace(',', ''), 10);
      //#endregion

      //#region 전투 레벨 파싱
      const charLevelInfo = /전투 레벨<\/span><span><small>Lv.<\/small>(.*?)</g.exec(
        str,
      );
      if (charLevelInfo === null) {
        throw Error('정상적인 전투 레벨 파싱 결과물이 아닙니다.');
      }

      const charLevel = parseInt(charLevelInfo[1], 10);

      //#endregion

      //#region 직업 아이콘, 직업 파싱
      const JobIconAndJobName = /profile-character-info__img" src="(.*?)" alt="(.*?)">/g.exec(
        str,
      );
      if (JobIconAndJobName === null) {
        throw Error('정상적인 직업 아이콘 및 직업 파싱 결과물이 아닙니다.');
      }

      const jobIcon = JobIconAndJobName[1];
      const job = JobIconAndJobName[2];
      //#endregion

      //#region 캐릭터 프로필 파싱
      ElectronLog.info('name', name);
      ElectronLog.info('job', job);
      const regex = new RegExp(`<img src="(.*?)" alt="${job}">`, 'g');
      ElectronLog.info('regex', regex);
      const charProfileSrcInfo = str.match(regex);
      if (charProfileSrcInfo === null) {
        throw Error('정상적인 캐릭터 프로필 파싱 결과물이 아닙니다.');
      }

      const profileInfo = /"(.*?)"/.exec(charProfileSrcInfo[1]);

      if (profileInfo === null) {
        ElectronLog.debug(charProfileSrcInfo);
        throw Error('정상적인 캐릭터 프로필 파싱 결과물이 아닙니다.2');
      }

      const profileSrc = profileInfo[1];
      //#endregion

      resolve({
        name,
        level: charLevel,
        jobProfileSrc,
        itemLevel,
        profileSrc,
        jobIcon,
        job,
        display: true,
      });
    });
  });
}

export { getCharList, getCharInfo };
