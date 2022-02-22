<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="row-two">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <!-- 直接绑定函数(包含多个 props) -->
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { HyCard } from "@/base-ui/card";
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart,
} from "@/components/page-echarts";
export default defineComponent({
  name: "dashboard",
  components: {
    HyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
  },
  setup() {
    const store = useStore();
    // 请求数据
    store.dispatch("dashboard/getDashboardDataAction");
    // 从 vuex 获取数据
    // 1. 商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    // 2. 商品销量
    const categoryGoodsSale = computed(() => {
      const title = "huaqi";
      // 定义数组
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        // 数组的数据填充
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }
      return { title, xLabels, values };
    });
    // 3. 商品收藏
    const categoryGoodsFavor = computed(() => {
      // 定义数组
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        // 数组的数据填充
        xLabels.push(item.name);
        values.push(item.goodsFavor);
      }
      return { xLabels, values };
    });
    // 4. 不同城市商品销量
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      });
    });

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
    };
  },
});
</script>

<style scoped>
.row-two {
  margin-top: 20px;
}
</style>
