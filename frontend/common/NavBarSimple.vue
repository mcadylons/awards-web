<template>
	<nav :class="['navbar', {vertical}]">
		<div :class="['container', {'is-fullwidth': fullwidth}]">
			<div class="navbar-brand mr-20">
				<a href="/"><img :src="logo" class="image pt-10 pb-10 pl-10 pr-10" style="height: 64px;"/></a>
				<a
					@click="expanded = !expanded"
					role="button"
					:class="['navbar-burger', {'is-active': expanded}]"
					aria-label="menu"
					:aria-expanded="expanded"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div :class="['navbar-menu', {'is-active': expanded}]">
				<div class="navbar-start">
					<a href="/" class="navbar-item" v-if="apps">Home</a>
					<nav-bar-link
						v-for="route in namedRoutes"
						:key="route.path"
						:route="route"
					/>
				</div>
				<div class="navbar-end">
					<nav-bar-link v-if="me">
						<img class="navbar-user-avatar" :src="me.reddit.avatar">
						/u/{{me.reddit.name}} {{levelDesignator}}

						<template slot="dropdown">
							<router-link
							v-if="apps"
								class="navbar-item"
								active-class="is-active"
								to="/apps/profile"
							>
								Profile settings
							</router-link>
							<router-link
							v-else
								class="navbar-item"
								active-class="is-active"
								to="/profile"
							>
								Profile settings
							</router-link>
							<a v-if="apps" class="navbar-item" href="/auth/logout/apps">
								Log out
							</a>
							<a v-else class="navbar-item" href="/auth/logout/home">
								Log out
							</a>
						</template>
					</nav-bar-link>
					<span v-else class="navbar-item">
						<a class="button is-orangered" href="/auth/reddit/login">
							Log in with Reddit
						</a>
					</span>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import {mapState} from 'vuex';
import NavBarLink from './NavBarLink';
import logo from '../../img/awards2020.png';

export default {
	components: {
		NavBarLink,
	},
	props: {
		routes: Array,
		fullwidth: Boolean,
		vertical: Boolean,
		apps: Boolean,
	},
	data () {
		return {
			expanded: false,
			logo,
		};
	},
	computed: {
		...mapState([
			'me',
		]),
		levelDesignator () {
			switch (this.me.level) {
				case 4: return '[Admin]';
				case 3: return '[Mod]';
				case 2: return '[Host]';
				case 1: return '[Juror]';
				default: return '';
			}
		},
		namedRoutes () {
			return this.routes.filter(route => route.name);
		},
	},
};
</script>

<style lang="scss">
.navbar-user-avatar {
	margin-right: 10px;
	border-radius: 5px;
}
.navbar > .container.is-fullwidth {
	max-width: none;
	flex-basis: calc(100% - 1.5rem);
	flex-grow: 0;
}
</style>
