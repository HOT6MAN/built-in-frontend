<template>
  <div class="sideBar">
      <div class="component27Parent">
          <div class="component29">
              <img class="widgetsBlack24dp1Icon" alt="" src="@/icons/Sidebar/DashBoard.svg" />
              <div class="integrationWrapper">
                  <div class="dashboard">대시보드</div>
              </div>
          </div>
          <div class="component30Parent">
              <div class="component30">
                  <img class="widgetsBlack24dp1Icon" alt="" src="@/icons/Sidebar/Config.svg" />
                  <div class="collaborationParent">
                      <div class="dashboard">환경설정</div>
                  </div>
              </div>
              <div class="collabParent">
                  <div class="collab">
                      <div class="dataRequestWrapper">
                          <div class="dataRequest">
                              <ol class="ol">
                                  <li>빌드 환경 설정</li>
                              </ol>
                          </div>
                      </div>
                  </div>
                  <div class="collab">
                      <div class="dataRequestWrapper">
                          <div class="dataRequest">
                              <ol class="ol">
                                  <li>Git 연동 확인</li>
                              </ol>
                          </div>
                      </div>
                  </div>
                  <div class="collab2">
                      <div class="dataRequestWrapper">
                          <div class="dataRequest">
                              <ol class="ol">
                                  <li>Jenkins 환경 설정</li>
                              </ol>
                          </div>
                      </div>
                  </div>
                  <div class="collab2">
                      <div class="dataRequestWrapper">
                          <div class="dataRequest">
                              <ol class="ol">
                                  <li>배포 환경 설정</li>
                              </ol>
                          </div>
                      </div>
                  </div>
                  <div class="collab2">
                      <div class="dataRequestWrapper">
                          <div class="dataRequest">
                              <ol class="ol">
                                  <li>빌드 결과 확인</li>
                              </ol>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="component29">
              <img class="widgetsBlack24dp1Icon" alt="" src="@/icons/Sidebar/Build.svg" />
              <div class="integrationWrapper">
                  <div class="dashboard">빌드 기록</div>
              </div>
          </div>
          <div class="component29">
              <img class="keyboardArrowDown24pxIcon" alt="" src="@/icons/Sidebar/ServerMornitoring.svg" />
              <div class="integrationWrapper">
                  <div class="dashboard">서버 모니터링</div>
              </div>
          </div>
          </div>
      </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
      name: "SideBar"
  })
</script>
<style module>
.chevronLeft24pxIcon {
      width: 24px;
      position: relative;
      height: 24px;
      display: none;
  }
      .chevronLeft24pxWrapper {
          position: absolute;
          top: 944px;
          left: 192px;
          width: 24px;
          height: 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
      }
      .dashboard24pxIcon {
          width: 24px;
          position: relative;
          height: 24px;
          object-fit: cover;
      }
      .dashboard {
          position: relative;
          font-weight: 600;
      }
      .keyboardArrowDown24pxIcon {
          width: 24px;
          position: relative;
          height: 24px;
      }
      .dashboardParent {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 21px;
      }
      .component27 {
          width: 190px;
          display: none;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: var(--padding-xs);
          box-sizing: border-box;
          gap: var(--gap-7xs);
      }
      .widgetsBlack24dp1Icon {
          width: 24px;
          position: relative;
          height: 24px;
          overflow: hidden;
          flex-shrink: 0;
      }
      .asdfasdfadf {
          width: 82px;
          position: relative;
          font-weight: 600;
          display: none;
      }
      .asdfasdfadfWrapper {
          width: 130px;
          height: 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
      }
      .integrationWrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
      }
      .component29 {
          width: 190px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: var(--padding-xs);
          box-sizing: border-box;
          gap: var(--gap-7xs);
      }
      .collaborationParent {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 1px;
      }
      .component30 {
          width: 190px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: var(--padding-xs);
          box-sizing: border-box;
          gap: 8px;
      }
      .ol {
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          padding-left: var(--padding-base);
      }
      .dataRequest {
          position: relative;
          font-weight: 500;
      }
      .dataRequestWrapper {
          width: 156px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
      }
      .collab {
          width: 150px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--padding-3xs) var(--padding-lg);
          box-sizing: border-box;
          color: var(--flowkit-white);
      }
      .collab2 {
          width: 150px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--padding-3xs) var(--padding-lg);
          box-sizing: border-box;
      }
      .collabParent {
          width: 188px;
          background-color: rgba(238, 238, 238, 0.03);
          height: 258px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--padding-xs) 0px;
          box-sizing: border-box;
          gap: var(--gap-xs);
          font-size: var(--font-size-xs);
          color: var(--icon-disabled);
          font-family: var(--font-roboto);
      }
      .component30Parent {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
      }
      .supportParent {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 43px;
      }
      .component27Parent {
          position: absolute;
          top: 120px;
          left: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-xs);
      }
      .sideBar {
          width: 100%;
          position: relative;
          background-color: #102a43;
          height: 1024px;
          overflow: hidden;
          text-align: left;
          font-size: var(--font-size-base);
          color: var(--flowkit-white);
          font-family: var(--font-inter);
      }
  
  </style>