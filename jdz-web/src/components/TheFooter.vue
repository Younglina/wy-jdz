<template>
  <el-footer>
    <nav mt-6 inline-flex gap-2 text-xl>
      <button icon-btn @click="toggleDark()">
        <div i-material-symbols-sunny-outline dark:i-material-symbols-nightlight-outline />
      </button>

      <a i-carbon-logo-github icon-btn rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank"
        title="GitHub" />
    </nav>
  </el-footer>
</template>
