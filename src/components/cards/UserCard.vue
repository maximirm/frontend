<template>
    <StyledCard
        @click="selectUser"
        :class="{ 'selected': isSelected }">
      <InfoPair
          :label="'Name:'"
          :value="user.name"/>
      <InfoPair
          :label="'Rolle:'"
          :value="user.role"/>
      <InfoPair
          :value="user.numberOfSurveys + ' Umfragen'"/>
    </StyledCard>
</template>

<script>
import StyledCard from "@/components/general/StyledCard.vue";
import InfoPair from "@/components/general/InfoPair.vue";

export default {
  name: 'UserCard',
  components: {InfoPair, StyledCard},
  props: {
    user: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    selectUser() {
      this.$emit('userSelected', this.user);
    },
  },
};
</script>
