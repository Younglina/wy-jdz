<template>
  <el-container h-full>
    <TheAside />
    <el-container direction="vertical">
      <TheHeader />
      <el-main>
        <RouterView />
      </el-main>
      <TheFooter />
    </el-container>
  </el-container>
</template>
